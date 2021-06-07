import { useToast } from "vue-toastification";
import axios from "axios";
import { baseURL } from "../../assets/env";

/**
 * @author Eko Sutrisno
 */

/**
 * Toast Instance
 */
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
    SET_OBJECTS: (state, payload) => {
      state.objects = payload;
    },
    SET_IS_PROCESS: (state, payload) => {
      state.isProcess = payload;
    },
    SET_IS_RECURSIVE_FOLDER: (state, payload) => {
      state.isRecursiveFolder = payload;
    },
    SET_IS_UPLOADING: (state, payload) => {
      state.isUploading = payload;
    },
    SET_IS_DOWNLOADING: (state, payload) => {
      state.isDownloading = payload;
    },
  },
  actions: {
    /**
     * Set Object Data
     * @param  {} {commit
     * @param  {} dispatch}
     * @param  {} bucketName
     */
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

    /**
     * Set Object Data base on the Path (Folder)
     * @param  {} {commit
     * @param  {} dispatch}
     * @param  {} data
     */
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

    /**
     * Handling Upload Object Action
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    onUploadObject({ dispatch }, dataPayload) {
      dispatch("setIsUploading", true);

      axios
        .post(dataPayload.url, dataPayload.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          dispatch("setObjectData", dataPayload.bucketName);
          toast.info(
            `File has been uploaded to bucket ${dataPayload.bucketName}.`
          );
          dispatch("setIsUploading", false);
        })
        .catch((err) => console.log(err));
    },

    /**
     * Handling Download Object
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    async onDownloadObject({ dispatch }, dataPayload) {
      dispatch("setIsDownloading", true);
      await axios
        .get(
          `${baseURL}/url?bucket=${dataPayload.bucketName}&object=${dataPayload.objectName}`
        )
        .then((res) => {
          try {
            if (res.status == 200) {
              dispatch("downloadAction", res.data);
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    },

    /**
     * Download Function and Method Action
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    downloadAction({ dispatch }, object) {
      axios({
        url: object.url,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", object.name);
        document.body.appendChild(fileLink);

        dispatch("setIsDownloading", false);
        fileLink.click();

      });
    },

    setIsProcess({ commit }, status) {
      commit("SET_IS_PROCESS", status);
    },

    setIsUploading({ commit }, status) {
      commit("SET_IS_UPLOADING", status);
    },

    setIsDownloading({ commit }, status) {
      commit("SET_IS_DOWNLOADING", status);
    },

    setIsRecursiveFolder({ commit }, status) {
      commit("SET_IS_RECURSIVE_FOLDER", status);
    },
  },
};

export default object_module;
