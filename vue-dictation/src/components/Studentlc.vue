<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="primary lighten-1"
      dark
      flat
    >
    <!--밑에 강좌이름도 받아오는걸로 바꾸기 -->
    <v-toolbar-title>강좌 이름</v-toolbar-title>
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
      <v-tab-item>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
    <v-data-table
      :headers="headers1"
      :items="lecture1"
      :search="search1"
    ></v-data-table>
  </v-card>
      </v-tab-item>
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
      :items="lecture"
      :search="search"
    ></v-data-table>
    </v-card>
    </v-tab-item>
    <v-tab-item>
              <v-card flat>
          <v-card-text>
            api 사용 여부에따라 추후 구성
          </v-card-text>
        </v-card>
    </v-tab-item>
    <v-tab-item>
     <!--받아쓰기 등록화면 --> 
         <v-container align-center>
 <v-form class="mt-12 pt-4 pr-4 pl-4">
   <div v-for="item in answers" :key="item.question_no"> 
     <span>{{item.question_no + ".   받아쓰기"}}</span>
     <audio src="../assets/dictation.wav" controls></audio>
    <v-text-field 
              label="정답을 적으세요."
              outlined
              v-model="item.question"
              :error="item.error"
              dense>
    </v-text-field>
  </div>
  
     <v-flex class="text-center">
        <v-btn width="270" color="primary" x-large @click="answersubmit()">제출</v-btn>
    </v-flex>
    </v-form>
      <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
          <v-card-title class="headline">당신의 점수는?</v-card-title>
          <v-card-text>{{this.score}} 점입니다.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="again()">다시하기</v-btn>
            <v-btn color="green darken-1" text @click="goLecture()">그만하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import router from '../router'
  export default {
    data () {
      return {
        lectureTitles:["신청강좌","공지사항","Q&A","받아쓰기하기"],
        tabs: null,
                search: '',
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
        lecture1: [
          {
            lecture_nm: '2반 받아쓰기',
            grade: 1,
            teach_id: '사오정',
            enroll_en_dt: '5.16-6.26',
            lecture_level: '70점',
          },   
        ],
        dialog: false,
        score: 0,
        answers: [
          {question_no: 1, question: '', lecture_no: 1, course_no: 1,hint:"",error:false, file: null},
          {question_no: 2, question: '', lecture_no: 1, course_no: 1,hint:"",error:false, file: null},
          {question_no: 3, question: '',lecture_no: 1, course_no: 1,hint:"",error:false, file: null},
          {question_no: 4, question: '',  lecture_no: 1, course_no: 1, hint:"",error:false, file: null},
          {question_no: 5, question: '',lecture_no: 1, course_no: 1, hint:"",error:false, file: null},
          {question_no: 6, question: '', lecture_no: 1, course_no: 1,hint:"", error:false, file: null},
          {question_no: 7, question: '',lecture_no: 1, course_no: 1,hint:"", error:false, file: null},
          {question_no: 8, question: '', lecture_no: 1, course_no: 1,hint:"", error:false, file: null},
          {question_no: 9, question: '', lecture_no: 1, course_no: 1,hint:"", error:false, file: null},
          {question_no: 10, question: '', lecture_no: 1, course_no: 1,hint:"", error:false, file: null},
          ],
      }
    },
    // 음성파일 들고오기 예시
    created(){
    this.$http.get('/api/common/lecture/list').then(res =>{
          console.log('status code: ${res.ban}');
          this.lectures=res.data;
          //console.log(res);
          //alert(JSON.stringify(this.lectures));
    })
    this.$http.get('/api/teacher/lecture/teach_mylec').then(res =>{
          //console.log('status code: ${res.ban}');
          this.mylectures=res.data;
          //console.log(res);
          //alert(JSON.stringify(this.lectures));
    })
  },
    methods: {
    answersubmit() {

     this.score = 0;
    let i =0;
      this.$http.post('api/dictation/enroll/answer', this.answers).then(res => {
        for(let answer of res.data) {
          
          if(answer) {
            this.score += 10;
          }else {
            this.answers[i].error = true;
          }
          i++;
        }
        this.dialog = true;
      }).catch( err => {
        console.log(err);
      })
    
     
    
    },
    again() {
      for(let i in this.answers) {
        this.answers[i].error = false;
        this.answers[i].question = "";
      }
      this.dialog = false
    },
    goLecture() {
      router.push({path: '/studentlc'})
    }
  }
}
</script>