export async function checkFileMimeType(file: any) {
    if (typeof file === "string") { // if its the URL from AWS S3
        return true
    }
    if (file && file.size) {
        return await checkMimeType(file);
    }
    return false
}


function checkMimeType(file: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
          let header = '';
          let isValid = false;
  
          // Convert the bytes to a hex string to check against known signatures
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
  
          // Check against known MIME type signatures for png, jpeg, and gif
          switch (header) {
            case '89504e47':
              isValid = true; // png
              break;
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
              isValid = true; // jpeg
              break;
            case '47494638':
              isValid = true; // gif
              break;
            default:
              isValid = false;
              break;
          }
  
          resolve(isValid); // Resolve the Promise with the result (true/false)
        }
      };
  
      reader.onerror = () => {
        reject(new Error('Error reading the file.'));
      };
  
      reader.readAsArrayBuffer(file);
    });
  }