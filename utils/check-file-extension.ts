const validFileExtensions = ["image/jpeg", "image/png", "image/gif"];

export function checkFileExtension(file: any) {
    if (typeof file === "string") { // if its the URL from AWS S3
        return true
    }
    if (file && file.type) {
        return validFileExtensions.includes(file.type)
    }
    return false
}