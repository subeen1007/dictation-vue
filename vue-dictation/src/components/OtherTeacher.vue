<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="primary lighten-1"
      dark
      flat
    >
    <!--밑에 강좌이름도 받아오는걸로 바꾸기 -->
    <v-toolbar-title>강좌 이름 : {{this.lecture_info.lecture_nm}}</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab
            v-for="lectureTitle in lectureTitles"
            :key="lectureTitle"
          >
          {{ lectureTitle }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <!-- 공지사항-->
      <v-tab-item>
          <v-card class="mx-auto">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="검색어를 입력하세요"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="notice"
      :loading="loading"
      sort-by="title"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      class="elevation-1"
      item-key="seq_no"
      show-expand
    >
    <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>공지사항</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">{{ item.content }}</td>
        </template>
    </v-data-table>
    </v-card>
    </v-tab-item>
    <!-- 질문하기-->
    <v-tab-item>
       <v-data-table
            :headers="headers3"
            :items="notice2"
            :loading="loading"
            sort-by="title"
            class="elevation-1"
          >
          <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>질문게시판</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
      </v-toolbar>
    </template>
   
       </v-data-table>
    </v-tab-item>
    <v-tab-item>
     <!--받아쓰기 등록화면 --> 
        <v-container align-center>
        <div style="max-height: 40px; margin-top: 50px;">
          <v-slider
            v-model="step_value"
            :tick-labels="ticksLabels"
            readonly
            label="단계"
            step="1"
            thumb-label="always"
            :max="40"
            :min="1"
            ticks="always"
            tick-size="3"
            
          ></v-slider>
          <v-btn width-right="60" color="primary" @click="minus_step()">1단계-</v-btn>
          <v-btn width-left="60" color="primary" @click="plus_step()">1단계+</v-btn>
        </div>

  <!-- 선생님이 완료한 강좌일때 -->
 <template v-if="finish_yes_cl.includes(step_value)">       
 <v-form class="mt-12 pt-4 pr-4 pl-4">
   <div v-for="item in answers" :key="item.question_no"> 
     <span>{{item.question_no + ".   받아쓰기"}}</span>
     <audio src="C:\\Users\\subin\\Desktop\\딕테이션_프로젝트\\각종문서\\(남성)흐흐흐흐1.wav" controls> </audio>
    <v-text-field 
              label="정답을 적으세요."
              outlined
              v-model="item.question"
              :error="item.error"
              dense>
    </v-text-field>
  </div>
    </v-form>
    </template>

    <!-- 선생님이 완료하지 않은 강좌일때 -->
    <template v-else>
       <v-card
    class="mx-auto"
    max-width="344"
    margin-top="555px"
    outlined
  >
    <v-list-item-title class="headline mb-1">등록된 받아쓰기가 없습니다</v-list-item-title>
  </v-card>
    </template>

    </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  //import router from '../router'
  

  export default {
    data () {
      return {
        notice:[],
        notice2:[],
        expanded: [],
        singleExpand: false,
        finish_yes_cl:[],//강좌에 대해 받아쓰기 완료처리된 단계들만 반환
        lecture_info:[],//강좌정보
        step_value: 1,
        lectureTitles:["공지사항","질문하기","받아쓰기하기"],
        tabs: null,
        search: '',
        headers: [
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'input_id' },
          { text: '파일', value: 'file_nm'},
        ],
        headers1: [
          {
            text: '강좌명',
            align: 'start',
            sortable: false,
            value: 'lecture_nm',
          },
          { text: '학년', value: 'grade' },
          { text: '선생님', value: 'teach_id' },
          { text: '강좌기간', value: 'enroll_en_dt' },
          { text: '내 점수', value: 'lecture_level' },
        ],
        headers3: [
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'input_id' },
          { text: '파일', value: 'file_nm'},
        ],

        answers: [
          {question_no: 1, question: '', course_no: 1,hint:"",error:false, fileUrl: null},
          {question_no: 2, question: '', course_no: 1,hint:"",error:false, fileUrl: null},
          {question_no: 3, question: '', course_no: 1,hint:"",error:false, fileUrl: null},
          {question_no: 4, question: '', course_no: 1, hint:"",error:false, fileUrl: null},
          {question_no: 5, question: '', course_no: 1, hint:"",error:false, fileUrl: null},
          {question_no: 6, question: '', course_no: 1,hint:"", error:false, fileUrl: null},
          {question_no: 7, question: '', course_no: 1,hint:"", error:false, fileUrl: null},
          {question_no: 8, question: '', course_no: 1,hint:"", error:false, fileUrl: null},
          {question_no: 9, question: '', course_no: 1,hint:"", error:false, fileUrl: null},
          {question_no: 10, question: '', course_no: 1,hint:"", error:false, fileUrl: null},
          ],
      }
    },
    // 음성파일 들고오기 예시
    created(){      
      //강좌정보 가져옴
      this.$http.get(`api/common/lecture/get`).then(res => {
            this.lecture_info=res.data;
      })


      //받아쓰기 question, fileUrl정보 반환
      for(let answer of this.answers){
        const formData=new FormData();
        formData.append("course_no",answer.course_no);
        formData.append("question_no",answer.question_no);
        this.$http.post('/api/dictation/course/get',formData).then(res =>{
              answer.fileUrl=res.data.fileUrl;
              answer.question=res.data.question;
              console.log(res.data);
        })
      }
      //강좌에 대해 받아쓰기 완료처리된 단계들만 반환
      this.$http.get(`api/dictation/course/finish_yes_cl`).then(res => {
            this.finish_yes_cl=res.data;
      })
      //공지사항 들고오기
      this.$http.get(`/api/board/list/${"006001"}`).then(res =>{
          this.notice=res.data;
        })
      //QNA 들고오기
      this.$http.get(`/api/board/list/${"006003"}`).then(res =>{
          this.notice2=res.data;
      })
    },
     
      created2 () {
        this.initialize()
      },

    methods: {
      initialize () {
        this.notice = [
        ]
      },

    minus_step(){
      this.step_value = (this.step_value - 1) || 1
      for(let answer of this.answers){
        answer.course_no=this.step_value;
        const formData=new FormData();
        formData.append("course_no",answer.course_no);
        formData.append("question_no",answer.question_no);
        this.$http.post('/api/dictation/course/get',formData).then(res =>{
              answer.fileUrl=res.data.fileUrl;
              answer.question=res.data.question;
              console.log(res.data);
        })
      }
    },
    plus_step(){
      
      this.step_value = (this.step_value + 1) || 40
      for(let answer of this.answers){
        answer.course_no=this.step_value;
        const formData=new FormData();
        formData.append("course_no",answer.course_no);
        formData.append("question_no",answer.question_no);
        this.$http.post('/api/dictation/course/get',formData).then(res =>{
              answer.fileUrl=res.data.fileUrl;
              answer.question=res.data.question;
              console.log(res.data);
        })
      }
    }
  }
}
</script>