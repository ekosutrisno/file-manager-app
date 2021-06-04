import axios from "axios";
import { useToast } from "vue-toastification";
import { baseURL } from "../../assets/env";

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
    SET_BUCKETS: (state, payload) => (state.buckets = payload),
    SET_IS_PROCESS: (state, payload) => (state.isProcess = payload),
  },
  actions: {
    setBucketData({ commit, dispatch }) {
      dispatch("setIsProcessStatus", true); // Loading On

      axios
        .get(`${baseURL}/bucket`)
        .then((res) => {
          commit("SET_BUCKETS", res.data);
          dispatch("setIsProcessStatus", false); // Loading Off
        })
        .catch((err) => {
          console.log(err);
          dispatch("setIsProcessStatus", false); // Loading Off
        });
    },

    createBucketData({ dispatch }, bucketName) {
      axios
        .post(`${baseURL}/bucket?bucketName=${bucketName}`)
        .then(() => {
          dispatch("setBucketData");
          toast.info(`Bucket ${bucketName.toUpperCase()} has been created.`);
        })
        .catch((err) => console.log(err));
    },

    deleteBucketData({dispatch}, bucketName) {
      axios
        .delete(`${baseURL}/bucket/${bucketName}`)
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
