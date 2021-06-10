const display_moduel = {
  namespaced: true,
  state() {
    return {
      display: "block",
    };
  },
  mutations: {
    SET_DISPLAY(state, display) {
      state.display = display;
    },
  },
  actions: {
    onChangeDisplay({ commit }, display) {
      commit("SET_DISPLAY", display);
      localStorage.setItem('display', display);
    },
  },
};
export default display_moduel;
