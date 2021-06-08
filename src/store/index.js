import { createStore } from "vuex";
import bucket_module from "./modules/bucket_module";
import object_module from "./modules/object_module";

const store = createStore({
  modules: {
    bucket_module,
    object_module,
  },
});

export default store;
