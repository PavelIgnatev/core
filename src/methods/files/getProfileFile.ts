import fs from "fs";
import path from "path";

import { CustomFile } from "../../telegram/CustomFile";

export const getProfileFile = () => {
  const files = fs.readdirSync(path.join(__dirname, "src/images"));
  const randomIndex = Math.floor(Math.random() * files.length);

  const randomFile = files[randomIndex];

  const fileName = path.basename(randomFile);

  const file = new CustomFile(
    fileName,
    fs.statSync(path.join(__dirname, `src/images/${fileName}`)).size,
    path.join(__dirname, `src/images/${fileName}`),
    fs.readFileSync(path.join(__dirname, `src/images/${fileName}`))
  );

  return file;
};
