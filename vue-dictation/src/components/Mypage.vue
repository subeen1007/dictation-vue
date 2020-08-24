<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <!-- <v-alert :value="isRegisterError" type="error">
          아이디와 비밀번호,이름을 모두 입력해주세요.
        </v-alert>
        <v-alert :value="isRegister" type="success">
          로그인이 완료되었습니다.
        </v-alert> -->
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>마이페이지</v-toolbar-title>
          </v-toolbar>

          <!-- 수정버튼x, 기본 마이페이지 -->
          <div class="pa-3" v-if="is_readonly">
            아이디: 
            <input v-model="user_info.user_id" id="user_id" readonly="true">
            <v-spacer></v-spacer>           
            학교코드:
            <input v-model="user_info.school_cd" id="school_cd" readonly="true">
            <v-spacer></v-spacer>
            신분:
            <input v-model="user_info.position_cd" id="position_cd" readonly="true">
            <v-spacer></v-spacer>
            한국이름:
            <input v-model="user_info.kor_nm" id="kor_nm" readonly="true">
            <v-spacer></v-spacer>
            영어이름:
            <input v-model="user_info.end_nm" id="end_nm" readonly="true">
            <v-spacer></v-spacer>
            학년:
            <input v-model="user_info.grade" id="grade" readonly="true">
            <v-spacer></v-spacer>
            반:
            <input v-model="user_info.ban" id="ban" readonly="true">
            <v-spacer></v-spacer>
            생년월일:
            <input v-model="user_info.birth_dt" id="birth_dt" readonly="true">
            <v-spacer></v-spacer>
            핸드폰번호:
            <input v-model="user_info.cel_phone_no" id="cel_phone_no" readonly="true">
            <v-spacer></v-spacer>
            집전화번호:
            <input v-model="user_info.hom_phone_no" id="hom_phone_no" readonly="true">
            <v-spacer></v-spacer>  
            성별:
            <input v-model="user_info.gender_cd" id="gender_cd" readonly="true">
            <v-spacer></v-spacer>
            이메일:
            <input v-model="user_info.email" id="email" readonly="true">       
            <v-btn large block depressed color="primary" @click="modify()">수정하기</v-btn>
          </div>
          
          <!-- 수정버튼 누른 마이페이지 -->
          <div v-else>
            <v-text-field
              v-model="pw1"
              type="password"
              label="패스워드를 입력하세요."
            ></v-text-field>
            <v-text-field
              v-model="pw1_check"
              type="password"
              label="패스워드 확인"
            ></v-text-field>
            <v-select
              class="float-left"
              v-model="user_info.grade"
              :items="grades"
              label="학년"
            ></v-select>
            <v-text-field
              v-model="user_info.ban"
              type="text"
              label="반"
            ></v-text-field>
            <v-text-field
              v-model="user_info.kor_nm"
              type="text"
              label="한국 이름을 입력하세요."
            ></v-text-field>
            <v-text-field
              v-model="user_info.end_nm"
              type="text"
              label="영어 이름을 입력하세요."
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="생년월일"
               
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="user_info.birth_dt" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(user_info.birth_dt)">OK</v-btn>
            </v-date-picker>
            </v-dialog>
            <v-radio-group v-model="user_info.gender_cd" row>
              <v-radio label="남자" value="남자"></v-radio>
              <v-radio label="여자" value="여자"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="user_info.cel_phone_no"
              type="text"
              label="핸드폰 번호를 입력하세요."
            ></v-text-field>
             <v-text-field
              v-model="user_info.hom_phone_no"
              type="text"
              label="집 전화번호를 입력하세요."
            ></v-text-field>
             
             <v-text-field
              v-model="user_info.email"
              type="email"
              label="이메일을 입력하세요."
            ></v-text-field>
            <v-flex class="text-center"> 
              <v-btn width="135" color="primary" @click="modify_finish()">수정완료</v-btn>
              <v-btn width="135" color="primary" @click="cancel()">취소</v-btn>
            </v-flex>
          </div>
          
        </v-card>      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import {mapActions} from 'vuex';

  export default {

    created(){
        this.$http.get(`/api/common/user/get`).then(res =>{//회원정보 반환
          this.user_info=res.data;
          this.user_info.gender_cd=this.user_info.gender_cd==='002001' ? '남자':'여자';
          this.user_info.position_cd=this.user_info.position_cd==="003002" ? "선생님":"학생";
          
        })
    },

    data () {
      return {
        user_info:[],
        is_readonly:true,
        pw1:null,
        pw1_check:null,
        grades: [1, 2, 3, 4,5,6],
        positions: ['학생', '선생님'],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        gender_cd:"",
        user_id: "",
        position: "",
        grade: Number,
        hom_phone_no:"",
        cel_phone_no:"",
        email:"",
        end_nm:"",
        kor_nm:"",
        ban:"",
        pw:""
      }
    },
  
    methods: {
      //학생정보수정
      modify(){
        this.is_readonly=false;
      },
      //학생정보 수정완료 버튼
      modify_finish(){

        if(this.pw1_check==null | this.pw1==null){
          alert("비밀번호를 입력하세요");
        }else if(this.pw1_check!=this.pw1){
          alert("비밀번호가 일치하지 않습니다.");
        }else{
          this.user_info.pw=this.pw1;
          this.$http.post('/api/common/user/update',this.user_info).then(res =>{
              console.log(res);
              this.pw1=null
              this.pw1_check=null
          })
          this.is_readonly=true;
        }
      },
      //마이페이지 수정 취소
      cancel(){
        this.is_readonly=true;
      }
      //...mapActions(['signUp'])
    },

  }
</script>