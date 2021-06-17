import { useToast } from "vue-toastification";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
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
      allObjects: [],
      objects: [],
      directories: [],
      selectedObject: [],
      objectToDelete: {},
      path: "",
      urlPreview: "",
      processStatus: 0,
      status: 0,
      isOnSelect: false,
      isProcess: false,
      isUploading: false,
      isDownloading: false,
      isDeleteProcess: false,
      isDeleteConfim: false,
      isRecursiveFolder: false,
    };
  },
  mutations: {
    SET_OBJECTS: (state, payload) => {
      state.objects = payload;
    },
    SET_ALL_OBJECT: (state, payload) => {
      state.allObjects = payload;
    },
    CLEAR_SELECTED_OBJECT: (state, data) => {
      var objects = state.objects.filter((obj) => obj.deleteMarker);
      objects.forEach((obj) => (obj.deleteMarker = false));
    },
    SET_IS_ON_SELECT: (state, data) => {
      state.isOnSelect = data;
    },
    SET_SELECTED_OBJECT: (state, payload) => {
      var data = state.objects.filter(
        (obj) => obj.objectName === payload.objectName
      );
      if (data.length > 0) {
        var objectData = data[0];
        if (objectData.deleteMarker) objectData.deleteMarker = false;
        else objectData.deleteMarker = true;
      }
    },
    SET_DIRECTORIES: (state, payload) => {
      state.directories = payload;
    },
    SET_STATUS: (state, payload) => {
      state.status += payload;
    },
    SET_PROCCESS_STATUS: (state, payload) => {
      state.processStatus = payload;
    },
    SET_PATH: (state, payload) => {
      state.path = payload;
    },
    SET_URL_PREVIEW: (state, payload) => {
      state.urlPreview = payload;
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
    SET_IS_DELETE_PROCESS: (state, payload) => {
      state.isDeleteProcess = payload;
    },
    SET_IS_DELETE_CONFIRM: (state, payload) => {
      state.isDeleteConfim = payload;
    },
    SET_OBJECT_TO_DELETE: (state, payload) => {
      state.objectToDelete = payload;
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
      dispatch("setPath", "");

      axios
        .get(`${baseURL}/object/${bucketName}`)
        .then((res) => {
          commit("SET_ALL_OBJECT", res.data);

          var dirList = []; // Filter Object type Directory
          dirList = res.data.filter((file) => file.dir == true);

          var fileList = []; // Filter Object type File
          fileList = res.data.filter((file) => file.dir == false);

          commit("SET_DIRECTORIES", dirList);
          commit("SET_OBJECTS", fileList);
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
      dispatch("setPath", data.path);
      dispatch("setIsProcess", true);
      dispatch("setIsRecursiveFolder", true);

      axios
        .get(`${baseURL}/object/${data.bucketName}/path?path=${data.path}`)
        .then((res) => {
          commit("SET_ALL_OBJECT", res.data);

          var dirList = []; // Filter Object type Directory
          dirList = res.data.filter((file) => file.dir == true);

          var fileList = []; // Filter Object type File
          fileList = res.data.filter((file) => file.dir == false);

          commit("SET_DIRECTORIES", dirList);
          commit("SET_OBJECTS", fileList);

          dispatch("setIsProcess", false);
        })
        .catch((err) => console.log(err));
    },

    /**
     * Handling Upload Object Action
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    onUploadObject({ commit, dispatch }, dataPayload) {
      dispatch("setIsUploading", true);

      axios
        .post(dataPayload.url, dataPayload.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            var complete =
              (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
            commit("SET_PROCCESS_STATUS", complete);
          },
        })
        .then(() => {
          dispatch("setObjectData", dataPayload.bucketName);
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

    /**
     * Delete Object Action
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    async onDeleteObject({ dispatch }, dataPayload) {
      dispatch("setIsDeleteConfirm", false);
      dispatch("setIsDeleteProcess", true);

      await axios
        .delete(
          `${baseURL}/object/single?bucket=${dataPayload.bucketName}&object=${dataPayload.objectName}`
        )
        .then(() => {
          if (!dataPayload.isRecursiveFolder) {
            dispatch("setObjectData", dataPayload.bucketName);
            dispatch("setIsDeleteProcess", false);
            dispatch("setObjectToDelete", {});
          } else {
            var payload = {
              bucketName: dataPayload.bucketName,
              path: dataPayload.path,
            };

            dispatch("setObjectDataPath", payload);
            dispatch("setIsDeleteProcess", false);
            dispatch("setObjectToDelete", {});
          }
        })
        .catch((err) => console.log(err));
    },

    /**
     * Delete Multiple Object Action
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    async onDeleteMultipleObject({ state, dispatch }, dataPayload) {
      var tempDataToDelete = state.objects.filter((obj) => obj.deleteMarker);

      if (tempDataToDelete.length != 0) {
        var stringObjectName = "";

        tempDataToDelete.forEach((data, idx) => {
          stringObjectName += idx > 0 ? "," + data.objectName : data.objectName;
        });

        dispatch("setIsDeleteConfirm", false);
        dispatch("setIsDeleteProcess", true);

        if (stringObjectName.trim().length > 0)
          await axios
            .delete(
              `${baseURL}/object/multiple?bucket=${dataPayload.bucketName}&object=${stringObjectName}`
            )
            .then(() => {
              if (!dataPayload.isRecursiveFolder) {
                dispatch("setObjectData", dataPayload.bucketName);
                dispatch("setIsDeleteProcess", false);
                dispatch("setObjectToDelete", {});
              } else {
                var payload = {
                  bucketName: dataPayload.bucketName,
                  path: dataPayload.path,
                };

                dispatch("setObjectDataPath", payload);
                dispatch("setIsDeleteProcess", false);
                dispatch("setObjectToDelete", {});
              }

              toast.info(`${tempDataToDelete.length} Files has been deleted.`);
            })
            .catch((err) => console.log(err));
      }
    },

    /**
     * Delete Object as Directory
     * @param  {} {dispatch}
     * @param  {} dataPayload
     */
    async onDeleteDir({ dispatch }, dataPayload) {
      dispatch("setIsDeleteConfirm", false);
      dispatch("setIsDeleteProcess", true);

      await axios
        .delete(
          `${baseURL}/object/path?bucket=${dataPayload.bucketName}&path=${dataPayload.prefixPath}`
        )
        .then(() => {
          dispatch("setObjectData", dataPayload.bucketName);
          dispatch("setIsDeleteProcess", false);
          dispatch("setObjectToDelete", {});
        })
        .catch((err) => console.log(err));
    },
    /**
     * Set Url for preview image file
     * @param  {} {commit}
     * @param  {} dataPayload
     */
    async setUrlPreview({ commit }, dataPayload) {
      await axios
        .get(
          `${baseURL}/url?bucket=${dataPayload.bucketName}&object=${dataPayload.objectName}`
        )
        .then((res) => {
          try {
            if (res.status == 200) {
              commit("SET_URL_PREVIEW", res.data.url);
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    },
    /**
     * Download Multiple File and Pack in to .zip File
     * @param  {} {state
     * @param  {} commit
     * @param  {} dispatch}
     * @param  {} dataPayload
     */
    downLoadAndZip({ state, commit, dispatch }, dataPayload) {
      // Data Selected
      const dataToDownload = state.objects.filter((obj) => obj.deleteMarker);
      const zip = new JSZip();
      const promises = [];

      // Set IsDelete Process
      dispatch("setIsDownloading", true);

      dataToDownload.forEach((data) => {
        axios
          .get(
            `${baseURL}/url?bucket=${dataPayload.bucketName}&object=${data.objectName}`
          )
          .then((res) => {
            const promise = getFile(commit, res.data.url).then((file) => {
              const file_name = data.objectName;
              zip.file(file_name, file, { binary: true });

              if (state.status == dataToDownload.length) {
                dispatch("setIsDownloading", false);

                setTimeout(() => {
                  Promise.all(promises).then(() => {
                    zip.generateAsync({ type: "blob" }).then((content) => {
                      FileSaver.saveAs(
                        content,
                        `${dataPayload.bucketName.toUpperCase()}.zip`
                      ); // Save the file with file-saver Custom file name after 3 second
                    });
                  });
                }, 1500);
              }
            });

            promises.push(promise);
          });
      });
    },

    clearSelectedObject({ commit }, data) {
      commit("CLEAR_SELECTED_OBJECT", data);
    },

    setSelectedObject({ commit }, objectPayload) {
      commit("SET_SELECTED_OBJECT", objectPayload);
    },

    setIsOnSelect({ commit }, status) {
      commit("SET_IS_ON_SELECT", status);
    },

    setPath({ commit }, path) {
      commit("SET_PATH", path);
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

    setIsDeleteProcess({ commit }, status) {
      commit("SET_IS_DELETE_PROCESS", status);
    },

    setIsDeleteConfirm({ commit }, status) {
      commit("SET_IS_DELETE_CONFIRM", status);
    },

    setObjectToDelete({ commit }, payload) {
      commit("SET_OBJECT_TO_DELETE", payload);
    },
  },
};

/**
 * Generate Promise Method
 * @param  {} url
 * {@link downLoadAndZip}
 */
const getFile = (commit, url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url,
      responseType: "arraybuffer",
    })
      .then((data) => {
        resolve(data.data);
        commit("SET_STATUS", 1);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

export default object_module;
