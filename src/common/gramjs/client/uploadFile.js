import { Blob } from 'buffer';

// eslint-disable-next-line import/no-named-default
import { default as Api } from '../tl/api';

import { generateRandomBytes, readBigIntFromBuffer, sleep } from '../Helpers';
import { getUploadPartSize } from '../Utils';
import errors from '../errors';
import { Foreman } from '../foreman';

const KB_TO_BYTES = 1024;
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;
const DISCONNECT_SLEEP = 1000;
const MAX_CONCURRENT_CONNECTIONS = 3;
const MAX_CONCURRENT_CONNECTIONS_PREMIUM = 6;
const MAX_WORKERS_PER_CONNECTION = 10;

const foremans = Array(MAX_CONCURRENT_CONNECTIONS_PREMIUM)
  .fill(undefined)
  .map(() => new Foreman(MAX_WORKERS_PER_CONNECTION));

export async function uploadFile(client, reailFile) {
  const { name, size } = reailFile;
  const file = new Blob([reailFile.buffer]);
  const fileId = readBigIntFromBuffer(generateRandomBytes(8), true, true);
  const isLarge = size > LARGE_FILE_THRESHOLD;
  const partSize = getUploadPartSize(size) * KB_TO_BYTES;
  const partCount = Math.floor((size + partSize - 1) / partSize);
  const activeCounts = foremans.map(({ activeWorkers }) => activeWorkers);
  const promises = [];

  let currentForemanIndex = activeCounts.indexOf(Math.min(...activeCounts));

  for (let i = 0; i < partCount; i++) {
    const senderIndex = currentForemanIndex % MAX_CONCURRENT_CONNECTIONS;
    await foremans[senderIndex].requestWorker();

    const blobSlice = file.slice(i * partSize, (i + 1) * partSize);
    // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
    promises.push(
      (async (jMemo, blobSliceMemo) => {
        while (true) {
          let sender;
          try {
            sender = await client.getSender(
              client.session.dcId,
              senderIndex,
              false
            );
            const partBytes = await blobSliceMemo.arrayBuffer();

            await sender.send(
              isLarge
                ? new Api.upload.SaveBigFilePart({
                    fileId,
                    filePart: jMemo,
                    fileTotalParts: partCount,
                    bytes: Buffer.from(partBytes),
                  })
                : new Api.upload.SaveFilePart({
                    fileId,
                    filePart: jMemo,
                    bytes: Buffer.from(partBytes),
                  })
            );
          } catch (err) {
            if (sender && !sender.isConnected()) {
              await sleep(DISCONNECT_SLEEP);
              continue;
            } else if (err instanceof errors.FloodWaitError) {
              await sleep(err.seconds * 1000);
              continue;
            }
            foremans[senderIndex].releaseWorker();

            throw err;
          }

          foremans[senderIndex].releaseWorker();

          break;
        }
      })(i, blobSlice)
    );

    currentForemanIndex++;
  }

  await Promise.all(promises);

  return isLarge
    ? new Api.InputFileBig({
        id: fileId,
        parts: partCount,
        name,
      })
    : new Api.InputFile({
        id: fileId,
        parts: partCount,
        name,
        md5Checksum: '',
      });
}
