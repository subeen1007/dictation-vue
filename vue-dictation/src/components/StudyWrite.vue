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
          <input v-model="lecture.lecture_nm" id="LECTURE_NM" placeholder="강좌이름">
          </div>
          <div>
          <input v-model="lecture.school_cd" id="SCHOOL_CD" placeholder="학교이름">
          </div>
          <div>
          <input v-model="lecture.grade" id="GRADE" placeholder="학년">
          </div>
          <div>
          <input v-model="lecture.ban" id="BAN" placeholder="반">
          </div>
          <div>
          <input v-model="lecture.teacher_nm" id="TEACHER_NM" placeholder="강좌등록 선생님 이름">
          </div>
          <div>
          <input v-model="lecture.max_cnt" id="MAX_CNT" placeholder="수강 최대 인원">
          </div>
          <!--수강신청 및 받아쓰기 날짜 설정 필요 -->
          <v-flex class="text-center">
          <v-btn width="270" color="primary" x-large @click="sumbit()">등록</v-btn>
          </v-flex>
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
    data: () =>({
      
      courseTabs: ["강좌등록"],
      tabs: null,
      text:"",
      //데이터를 넣기위해선 함수형태여야함(data:()=>({})형태)
      //값 받아올때 lecture.lecture_nm처럼 .연산자로 값 받아와야함
      lecture:
      {
        year:"",
        term:"",
        lecture_no:"",
        lecture_nm:"",
        school_cd:"",
        grade:"",
        ban:"",
        enroll_st_ct:"",
        enroll_ed_ct:"",
        teacher_id:"",
        teacher_nm:"",
        max_cnt:"",// 입력자 아이디, 입력일시, 수정아이디, 수정일시 넣기 필요
        input_id:"",
        input_date:"",
        update_id:"",
        update_date:""
      }
      
    }),
    
    methods: {
      sumbit(){
      
          this.$http.post('/api/lecture', this.lecture).then(res =>{
              console.log(res);
              router.push({name: 'Home'});
          }).catch(err=>{
              console.error(err);
          })
      }
    }
  }
</script>