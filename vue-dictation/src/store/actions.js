import router from '../router/index';

const actions = {
  // 회원가입
  signUp({commit},signUpObj) {
   
    this.$http.post('/api/user',signUpObj).then((res) => {
      router.push({name:'SignIn'});
      console.log(res)
    }).catch((err) => {
      console.log(err,commit); 
    })
  },
  signIn({commit},signInObj) {
    this.$http.get(`/api/user/login/${signInObj.user_id}&${signInObj.pw}`).then((res)=> {
      commit("signInSuccess");
      console.log(res);
      if(res.data.position_cd === "003003") {
        commit("setSorT","학생");
        router.push({name: 'readlc'});
      }else {
        commit("setSorT","선생님");
        router.push({name: 'Home'});
      }
      
    })
  },
  logout({commit}){
    commit("logout");
    router.push({name:'SignIn'});
  }

}
export default actions;