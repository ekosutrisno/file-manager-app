const IS_DEV = true;
const IS_PROD_ERA = false;

export const baseURL = IS_DEV
  ? "http://localhost:9099/file"
  : IS_PROD_ERA
  ? "https://microservices-development.erajaya.com:9099/file"
  : "https://shielded-hollows-85991.herokuapp.com/file";
