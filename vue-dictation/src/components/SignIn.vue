<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <!-- <v-alert :value="isLoginError" type="error">
          이메일와 비밀번호를 확인해주세요.
        </v-alert>
        <v-alert :value="isLogin" type="success">
          로그인이 완료되었습니다.
        </v-alert> -->
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>로그인</v-toolbar-title>
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
            <v-btn large block depressed color="primary" @click="signIn({
              user_id: user_id,
              pw: pw
            })">로그인</v-btn>
          </div>
          
        </v-card>      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'SignIn',
  data: () => ({
    user_id:"",
    pw:""
  }),
  methods: {
    ...mapActions(['signIn'])
  }
}
</script>