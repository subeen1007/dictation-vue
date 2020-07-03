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
            <v-toolbar-title>회원가입</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field
              v-model="user_id"
              type="text"
              label="아이디를 입력하세요"
            ></v-text-field>
            <v-text-field
              v-model="pw"
              type="password"
              label="패스워드를 입력하세요."
            ></v-text-field>
            <v-select
              v-model="position"
              :items="positions"
              label="신분"
            ></v-select>
            <v-select
              class="float-left"
              v-model="grade"
              :items="grades"
              label="학년"
            ></v-select>
            <v-text-field
              v-model="ban"
              type="text"
              label="반"
            ></v-text-field>
            <v-text-field
              v-model="kor_nm"
              type="text"
              label="한국 이름을 입력하세요."
            ></v-text-field>
            <v-text-field
              v-model="end_nm"
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
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
            </v-dialog>
            <v-radio-group v-model="gender_cd" row>
              <v-radio label="남자" value="G01"></v-radio>
              <v-radio label="여자" value="G02"></v-radio>
            </v-radio-group>
            <v-text-field
              v-model="cel_phone_no"
              type="text"
              label="핸드폰 번호를 입력하세요."
            ></v-text-field>
             <v-text-field
              v-model="hom_phone_no"
              type="text"
              label="집 전화번호를 입력하세요."
            ></v-text-field>
             
             <v-text-field
              v-model="email"
              type="email"
              label="이메일을 입력하세요."
            ></v-text-field>
            
            
            <v-btn large block depressed color="primary" @click="signUp(
                {
                  user_id : user_id,
                  pw: pw,
                  position_cd: position,
                  grade: grade,
                  ban:ban,
                  kor_nm: kor_nm,
                  end_nm: end_nm,
                  birth_dt: date,
                  gender_cd: gender_cd,
                  cel_phone_no: cel_phone_no,
                  hom_phone_no: hom_phone_no,
                  email: email
              }
            )">회원가입</v-btn>
          </div>
          
        </v-card>      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'SignUp',
  data: () => ({
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
  }),
  methods: {
    ...mapActions(['signUp'])
  }
}
</script>