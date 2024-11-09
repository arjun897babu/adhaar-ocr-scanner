import fs from "fs";

export const removeFiles = (filePath: string | undefined) => {
  console.log("file path in remove file", filePath);
  if (filePath === undefined) {
    return
  }
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
