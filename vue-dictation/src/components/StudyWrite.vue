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
        <!-- 강좌개설하기 버튼 눌렀을때 -->
        <v-card v-if="select_lecture===undefined">
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

        <!-- 강좌 수정/삭제 버튼 눌렀을때 -->
        <v-card v-else>
          <v-card-title>
          </v-card-title>
          <v-text-field
          label="강좌이름"
          outlined
          v-model="select_lecture.lecture_nm"
          dense>
          ></v-text-field>
          <v-text-field
          label="학교이름"
          outlined
          v-model="select_lecture.school_cd"
          dense>
          ></v-text-field>
          <v-text-field
          label="학년"
          outlined
          v-model="select_lecture.grade"
          dense>
          ></v-text-field>
          <v-text-field
          label="반"
          outlined
          v-model="select_lecture.ban"
          dense>
          ></v-text-field>
          <v-text-field
          label="강좌등록 선생님 이름"
          outlined
          v-model="select_lecture.teacher_nm"
          dense>
          ></v-text-field>
          <v-text-field
          label="수강최대 인원"
          outlined
          v-model="select_lecture.max_cnt"
          dense>
          ></v-text-field>

          <!--수강신청 및 받아쓰기 날짜 설정 필요 -->
          <v-flex class="text-center">          
          <div>
            <v-btn width="135" color="primary" x-large @click="lecture_update()">수정</v-btn>
            <v-btn width="135" color="primary" x-large @click="lecture_delete()">삭제</v-btn>
          </div>
          
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
      select_lecture:[],      
      courseTabs: ["강좌등록", "받아쓰기 등록"],
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
    
    created(){
      this.$http.get(`/api/common/lecture/get/${this.$route.params.select_lecture}`).then(res =>{
          this.select_lecture=res.data;
      })
    },
    
    methods: {
      sumbit(){
      
          this.$http.post('/api/teacher/lecture', this.lecture).then(res =>{
              console.log(res);
              router.push({name: 'Home'});
          }).catch(err=>{
              console.error(err);
          }) 
      },
      //강좌수정
      lecture_update(){
        this.$http.post('/api/common/lecture/update',this.select_lecture).then(res =>{
          console.log(res);
          router.push({name: 'Home'});
        })
      },
      //강좌삭제
      lecture_delete(){
        this.$http.get(`/api/common/lecture/delete/${this.$route.params.select_lecture}`).then(res =>{
          console.log(res);
          router.push({name: 'Home'});
        })
      }

    }
  }
</script>