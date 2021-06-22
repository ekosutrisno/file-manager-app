import { useToast } from "vue-toastification";
import api from '../../services/axiosInstance';

/**
 * @author Eko Sutrisno
 */

/**
 * Toast Instance
 */
const toast = useToast();

const bucket_module = {
  namespaced: true,
  state() {
    return {
      buckets: [],
      isProcess: false,
    };
  },
  mutations: {
    SET_BUCKETS: (state, payload) => {
      state.buckets = payload;
    },
    SET_IS_PROCESS: (state, payload) => {
      state.isProcess = payload;
    },
  },
  actions: {
    /**
     * Set Bucket Data [Get All Bucket]
     * @param  {} {commit
     * @param  {} dispatch}
     */
    setBucketData({ commit, dispatch }) {
      dispatch("setIsProcessStatus", true);

      api
        .get(`/bucket`)
        .then((res) => {
          commit(
            "SET_BUCKETS",
            res.data
            .filter((d) => d.name.toLowerCase().includes("exo-"))
          ); // Filter Only For Dev
          dispatch("setIsProcessStatus", false);
        })
        .catch((err) => {
          console.log(err);
          dispatch("setIsProcessStatus", false);
        });
    },

    /**
     * Create Bucket
     * @param  {} {dispatch}
     * @param  {} bucketName
     */
    createBucketData({ dispatch }, bucketName) {
      api
        .post(`/bucket?bucketName=${bucketName}`)
        .then(() => {
          dispatch("setBucketData");
          toast.info(`Bucket ${bucketName.toUpperCase()} has been created.`);
        })
        .catch((err) => console.log(err));
    },
    /**
     * Delete Bucket
     * @param  {} {dispatch}
     * @param  {} bucketName
     */
    deleteBucketData({ dispatch }, bucketName) {
      api
        .delete(`/bucket/${bucketName}`)
        .then(() => {
          dispatch("setBucketData");
          toast.info(`Bucket ${bucketName.toUpperCase()} has been deleted.`);
        })
        .catch((err) => console.log(err));
    },

    setIsProcessStatus({ commit }, status) {
      commit("SET_IS_PROCESS", status);
    },
  },
};

export default bucket_module;
