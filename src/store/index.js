import { createStore } from "vuex";
import bucket_module from "./modules/bucket_module";
import object_module from "./modules/object_module";
import url_module from "./modules/url_module";

const store = createStore({
  modules: {
    bucket_module,
    object_module,
    url_module,
  },
});

export default store;
