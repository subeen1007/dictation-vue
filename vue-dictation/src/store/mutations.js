
const mutations = {
  signInSuccess(state) {
    state.isSignIn = false;
  },
  signInError(state){
    state.isSignIn = true;
  },
  setSorT(state,payload){
    state.SorT = payload;
  },
  logout(state){
    state.isSignIn = true;
  }

}
export default mutations;
