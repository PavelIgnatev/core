import fs from 'fs';
import path from 'path';

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

export const getProfileFiles = (gender: 'male' | 'female') => {
  let files: string[] = [];
  let folderName = '';

  const getFilesFromFolder = () => {
    const folders = fs.readdirSync(path.join(__dirname, `/images/${gender}`));
    const randomIndex = Math.floor(Math.random() * folders.length);
    const randomFolder = folders[randomIndex];
    folderName = path.basename(randomFolder);
    files = fs
      .readdirSync(path.join(__dirname, `/images/${gender}/${folderName}`))
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (files.length < 3) {
    getFilesFromFolder();
  }

  const customFiles = files.map((fileName) => {
    return new CustomFile(
      fileName,
      fs.statSync(
        path.join(__dirname, `/images/${gender}/${folderName}/${fileName}`)
      ).size,
      path.join(__dirname, `/images/${gender}/${folderName}/${fileName}`),
      fs.readFileSync(
        path.join(__dirname, `/images/${gender}/${folderName}/${fileName}`)
      )
    );
  });

  return customFiles;
};

export const getAdultProfileFiles = () => {
  let files: string[] = [];
  let folderName = '';

  const getFilesFromFolder = () => {
    const folders = fs.readdirSync(path.join(__dirname, '/images/adult'));
    const randomIndex = Math.floor(Math.random() * folders.length);
    const randomFolder = folders[randomIndex];
    folderName = path.basename(randomFolder);
    files = fs
      .readdirSync(path.join(__dirname, `/images/adult/${folderName}`))
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (files.length < 3) {
    getFilesFromFolder();
  }

  const customFiles = files.map((fileName) => {
    return new CustomFile(
      fileName,
      fs.statSync(
        path.join(__dirname, `/images/adult/${folderName}/${fileName}`)
      ).size,
      path.join(__dirname, `/images/adult/${folderName}/${fileName}`),
      fs.readFileSync(
        path.join(__dirname, `/images/adult/${folderName}/${fileName}`)
      )
    );
  });

  return customFiles;
};
