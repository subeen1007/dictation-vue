<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="purple"
      dark
      flat
    >
    

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab
            v-for="courseTab in courseTabs"
            :key="courseTab"
          >
            {{courseTab}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
      
      <v-tab-item>
        <v-card>
          <v-card-title>
          </v-card-title>
          <div>
          <input v-model="message" id="LECTURE_NM" placeholder="강좌이름">
          </div>
          <div>
          <input v-model="message" id="SCHOOL_CD" placeholder="학교이름">
          </div>
          <div>
          <input v-model="message" id="GRADE" placeholder="학년">
          </div>
          <div>
          <input v-model="message" id="BAN" placeholder="반">
          </div>
          <div>
          <input v-model="message" id="TEACHER_ID" placeholder="강좌등록 선생님 이름">
          </div>
          <div>
          <input v-model="message" id="MAX_CNT" placeholder="수강 최대 인원">
          </div>
          <!--수강신청 및 받아쓰기 날짜 설정 필요 -->
          <v-flex class="text-center">
        <v-btn width="270" color="primary" x-large @click="sumbit()">등록</v-btn>
    </v-flex>
        <template v-slot:item.actions="{ item }">
          <v-btn class="mr-5" small color="primary" @click="{item}" >학습자료보기</v-btn>
          <v-btn small color="primary" @click="goCource()">시작하기</v-btn>
        </template>
        </v-card>
      </v-tab-item>
      <v-flex class="text-center">
    </v-flex>
     <v-tab-item>
          <v-card class="mx-auto">
    <v-card-title>
      <v-spacer></v-spacer>
    </v-card-title>
    </v-card>
    </v-tab-item>
     <v-tab-item>
    </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import router from '../router'
  export default {
    data () {
      return {
        courseTabs: ["강좌등록", "받아쓰기 등록"],
        tabs: null,
        text:'',
        LECTURE_NM:'',
        SCHOOL_CD:'',
        GRADE:'',
        BAN:'',
        TEACHER_ID:'',
        MAX_CNT:'',// 입력자 아이디, 입력일시, 수정아이디, 수정일시 넣기 필요
      }
    },
    methods: {
      sumbit(){
          for(let item of this.LECTURE_NM + this.SCHOOL_CD + this.GRADE + this.BAN + this.TEACHER_ID + this.MAX_CNT){
              this.$http.post('/api/lecture', item).then(res =>{
                  console.log(res);
                  router.push({name: 'stwr'});
              }).catch(err=>{
                  console.error(err);
              })
          }
      },
      goCource() {
        router.push({name: 'stwr'});
      }
    }
  }
</script>