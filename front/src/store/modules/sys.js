const state = () => ({
  loading: false,
  err: ""
});

const mutations = {
  setLoader(state, val) {
    state.loading = val;
  },
  setError(state, val) {
    state.err = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}