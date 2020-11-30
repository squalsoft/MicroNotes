const state = () => ({
  loading: false
});

const mutations = {
  setLoader(state, val) {
    state.loading = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}