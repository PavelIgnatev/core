import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

class CustomFile {
  name: string;
  size: number;
  path: string;
  buffer?: Buffer;

  constructor(name: string, size: number, path: string, buffer?: Buffer) {
    this.name = name;
    this.size = size;
    this.path = path;
    this.buffer = buffer;
  }
}

async function cropImageBuffer(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) return imageBuffer;
    
    const size = Math.min(metadata.width, metadata.height);
    const left = Math.floor((metadata.width - size) / 2);
    const top = Math.floor((metadata.height - size) / 2);
    
    return await image
      .extract({
        left,
        top,
        width: size,
        height: size,
      })
      .toBuffer();
  } catch {
    return imageBuffer;
  }
}

export const getProfileFiles = (
  prefix: 'male' | 'female' | 'adult' | 'vasilisa' | 'casino' | 'onlik'
) => {
  let files: string[] = [];
  let folderName = '';

  const getFilesFromFolder = () => {
    const folders = fs.readdirSync(path.join(__dirname, `/images/${prefix}`));
    const randomIndex = Math.floor(Math.random() * folders.length);
    const randomFolder = folders[randomIndex];
    folderName = path.basename(randomFolder);
    files = fs
      .readdirSync(path.join(__dirname, `/images/${prefix}/${folderName}`))
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (files.length < 3) {
    getFilesFromFolder();
  }

  const customFiles = files.map((fileName) => {
    const filePath = path.join(
      __dirname,
      `/images/${prefix}/${folderName}/${fileName}`
    );
    const originalBuffer = fs.readFileSync(filePath);

    return new CustomFile(
      fileName,
      fs.statSync(filePath).size,
      filePath,
      originalBuffer
    );
  });

  return Promise.all(
    customFiles.map(async (file) => {
      if (file.buffer) {
        file.buffer = await cropImageBuffer(file.buffer);
        file.size = file.buffer.length;
      }
      return file;
    })
  );
};
