import axios from "axios";

const IS_DEV = false;
const IS_PROD_ERA = true;

export const baseURL = IS_DEV
  ? "http://localhost:9099/file"
  : IS_PROD_ERA
  ? "https://microservices-development.erajaya.com:9099/file"
  : "https://shielded-hollows-85991.herokuapp.com/file";

export default axios.create({
  baseURL: baseURL
})
