import path from "path";

export const getFileUrl = (filename: string) => {
  return `/uploads/${filename}`;
};