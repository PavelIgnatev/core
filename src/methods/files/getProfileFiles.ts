import fs from "fs";
import path from "path";

import { CustomFile } from "../../telegram/CustomFile";

export const getProfileFiles = () => {
  let files: string[] = [];
  let folderName = "";

  const getFilesFromFolder = () => {
    const folders = fs.readdirSync(path.join(__dirname, "../../images"));
    const randomIndex = Math.floor(Math.random() * folders.length);
    const randomFolder = folders[randomIndex];
    folderName = path.basename(randomFolder);
    files = fs
      .readdirSync(path.join(__dirname, `../../images/${folderName}`))
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (files.length < 3) {
    getFilesFromFolder();
  }

  const customFiles = files.map((fileName) => {
    return new CustomFile(
      fileName,
      fs.statSync(
        path.join(__dirname, `../../images/${folderName}/${fileName}`)
      ).size,
      path.join(__dirname, `../../images/${folderName}/${fileName}`),
      fs.readFileSync(
        path.join(__dirname, `../../images/${folderName}/${fileName}`)
      )
    );
  });

  return customFiles;
};
