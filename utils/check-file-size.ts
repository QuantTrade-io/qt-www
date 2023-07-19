const MAX_FILE_SIZE = 10240000; // 10MB

export function checkFileSize(file: any) {
  if (typeof file === "string") {
    // if its the URL from AWS S3
    return true;
  }
  if (file && file.size) {
    return file.size <= MAX_FILE_SIZE;
  }
  return false;
}
