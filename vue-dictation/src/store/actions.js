import router from '../router/index';

const actions = {
  // 회원가입
  signUp({commit},signUpObj) {
   
    this.$http.post('/api/common/signup',signUpObj).then((res) => {
      router.push({name:'SignIn'});
      console.log(res)
    }).catch((err) => {
      console.log(err,commit); 
      alert("아이디가 중복됐습니다.");
    })
  },
  //로그인
  signIn({commit},signInObj) {
    this.$http.get(`/api/common/login/${signInObj.user_id}&${signInObj.pw}`).then((res)=> {
      console.log("hello world1: " + res.data.loginYn);
      
      if(res.data.loginYn === '0'){
        alert("hello world22222: " + res.data.loginYn);
        location.reload(true);
        //router.push({name:'signIn'});
      }else{
        commit("signInSuccess");
        if(res.data.position_cd === '003003') {
          commit("setSorT","학생");
          router.push({name: 'viewlc'});
        }else {
          commit("setSorT","선생님");
          router.push({name: 'Home'});
        }
      } 
    })
  },
  logout({commit}){
    commit("logout");
    router.push({name:'SignIn'});
  }


}
export default actions;