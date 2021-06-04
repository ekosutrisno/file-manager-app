import { useToast } from "vue-toastification";
import axios from "axios";
import { baseURL } from "../../assets/env";

const toast = useToast();

const object_module = {
  namespaced: true,
  state() {
    return {
      objects: [],
      isProcess: false,
      isUploading: false,
      isDownloading: false,
      isRecursiveFolder: false,
    };
  },
  mutations: {
    SET_OBJECTS: (state, payload) => (state.objects = payload),
    SET_IS_PROCESS: (state, payload) => (state.isProcess = payload),
    SET_IS_RECURSIVE_FOLDER: (state, payload) =>
      (state.isRecursiveFolder = payload),
  },
  actions: {
    setObjectData({ commit, dispatch }, bucketName) {
      dispatch("setIsProcess", true);
      dispatch("setIsRecursiveFolder", false);

      axios
        .get(`${baseURL}/object/${bucketName}`)
        .then((res) => {
          commit("SET_OBJECTS", res.data);
          dispatch("setIsProcess", false);
        })
        .catch((err) => console.log(err));
    },

    setObjectDataPath({ commit, dispatch }, data) {
      dispatch("setIsProcess", true);
      dispatch("setIsRecursiveFolder", true);

      axios
        .get(`${baseURL}/object/${data.bucketName}/path?path=${data.path}`)
        .then((res) => {
          console.log(res.data);
          commit("SET_OBJECTS", res.data);
          dispatch("setIsProcess", false);
        })
        .catch((err) => console.log(err));
    },

    onUploadObject({ dispatch }, dataPayload) {
      axios
        .post(dataPayload.url, dataPayload.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          dispatch("setObjectData", dataPayload.bucketName);
          toast.info(
            `File has been uploaded to bucket ${dataPayload.bucketName.toUpperCase()}.`
          );
        })
        .catch((err) => console.log(err));
    },

    onDownloadObject({ dispatch }, dataPayload) {},

    downloadAction({ dispatch }, dataPayload) {},

    setIsProcess({ commit }, status) {
      commit("SET_IS_PROCESS", status);
    },

    setIsRecursiveFolder({ commit }, status) {
      commit("SET_IS_RECURSIVE_FOLDER", status);
    },
  },
};

export default object_module;
