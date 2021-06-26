import moment from "moment";

/**
 * Format Size file function
 */
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Return File Extentions
 */
const checkFileExt = (fileName) => {
  var fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gim;
  return fileName.includes(".")
    ? fileName.match(fileExtensionPattern)[0]
    : ".exe";
};

/**
 * Check If File can be preview
 */
const isAllowPreview = (objectName) => {
  return (
    checkFileExt(objectName) === ".jpg" ||
    checkFileExt(objectName) === ".jpeg" ||
    checkFileExt(objectName) === ".webp" ||
    checkFileExt(objectName) === ".png" ||
    checkFileExt(objectName) === ".pdf" ||
    checkFileExt(objectName) === ".gif" ||
    checkFileExt(objectName) === ".svg"
  );
};

/**
 * Format date action using momen with format 'Apr 28, 2021 4:00 PM'
 */
const formatDateModified = (date) => {
  return moment(date).format("lll");
};

export { checkFileExt, formatBytes, isAllowPreview, formatDateModified };
