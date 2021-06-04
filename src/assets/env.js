const IS_DEV = false;

export const baseURL = IS_DEV
  ? "http://localhost:9099/file"
  : "https://shielded-hollows-85991.herokuapp.com/file";
