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
             <v-select
              class="float-left mt-6"
              v-model="searchs"
              :items="searchs"
              label="검색조건"
            ></v-select>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon color="indigo" class="pt-4">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-card-title>
        
            <v-btn color="primary" dark class="ml-5">강좌개설하기</v-btn>
         
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
          >
        <template v-slot:item.actions="{ item }">
          <v-btn class="mr-5" small color="primary" @click="{item}" >학습자료보기</v-btn>
          <v-btn small color="primary" @click="goCource()">시작하기</v-btn>
        </template>
        </v-data-table>
        </v-card>
      </v-tab-item>
     <v-tab-item>
          <v-card class="mx-auto">
              <!--
    <div id="choice">
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="items"
            label="단계를 선택하세요."
          ></v-select>
        </v-flex>`
      </v-layout>
    </div>
    -->
    <v-form class="mt-12 pt-4 pr-4 pl-4">
    <div v-for="item in lecture2" :key="item.question_no" > 
    <v-file-input accept="video/*,audio/*,image/*" @change="processFile($event, item)" label="upload"></v-file-input>
    <span>{{item.question_no + ". 받아쓰기 정답등록"}}</span>
    <v-text-field
        label="정답"
        outlined
        v-model="item.question"
        dense>
    ></v-text-field>
    </div>
    <v-flex class="text-center">
        <v-btn width="270" color="primary" x-large @click="submit()">등록</v-btn>
    </v-flex>
 </v-form>
    </v-card>
    </v-tab-item>
     <v-tab-item>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
       <v-data-table
        :headers="headers3"
        :items="lecture3"
        :search="search3"
       ></v-data-table>
     </v-card>
    </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import router from '../router'
  export default {
    data () {
      return {
        tabs: null,
        searchs:["조건1","조건2","조건3"],
        search: '',
        courseTabs: ["공지사항", "받아쓰기등록","학습현황","신청현황","QnA"],
        headers: [
          { text: 'No', value: 'Number' },
          { text: '제목', value: 'courseName' },
          { text: '파일', value: 'teacher' },
          { text: '작성자', value: 'courseDate' },
          { text: '조회', value: 'actions', sortable: false },
        ],
        desserts: [
          {
            courseName: '1반 받아쓰기',
            grade: 1,
            teacher: "홍길동",
            courseDate: "5.16 - 6.26",
        
          },
          {
            courseName: '2반 받아쓰기',
            grade: 1,
            teacher: "사오정",
            courseDate: "5.16 - 6.26",
      
          },
          {
            courseName: '3반 받아쓰기',
            grade: 1,
            teacher: "삼장",
            courseDate: "5.16 - 6.26",
      
          },
        ],
        headers2: [
          {text:'No', value:'board_cd'},
          {
            text: '제목',
            align: 'start',
            sortable: false,
            value: 'board_nm',
          },
          { text: '파일', value: 'file' },
          { text: '작성자', value: 'input_id' },
          { text: '작성일', value: 'input_dt' },
          { text: '조회수', value: 'views' },
        ],
        headers3: [
          {
            text: 'No',
            align: 'start',
            sortable: false,
            value: 'lecture_nm',
          },
          { text: '이름', value: 'grade' },
          { text: '학년', value: 'ban' },
          { text: '반', value: 'kor_nm' },
          { text: '진도율', value: 'lecture_level' },
          { text: '연습시간', value: 'lecture_level' },
          { text: '받아쓰기 점수', value: 'lecture_level' },
        ],
        lecture2: [
      {question_no: 1, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 2, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 3, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 4, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 5, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 6, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 7, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 8, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 9, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      {question_no: 10, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null, file: null },
      ],
      el: '#choice',
     items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      //files:[],
      }
  },
    methods: {
      submit() {
        //alert('오는가?');
        for(let item of this.lecture2) {

          const formData = new FormData();
          formData.append('course_no', item.course_no);
          formData.append('question', item.question);
          formData.append('question_no', item.question_no);
          formData.append("file", item.file);

          //alert('오는가2?');
          this.$http.post('/api/course',formData).then(res => {
            console.log(res);
            //alert('오는가3?');
            router.push({path: 'tmain'})
          }).catch(err => {
            //alert('오는가4?');
            console.error(err);
          })
        }

      //파일 저장
      // this.$http.post('/api/course/fileupload',formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }).then(res => {
      //   console.log(res);
      // }).catch(err => {
      //   console.error(err);
      // })
    },
    processFile(file, item) {
      item.file = file;
    }
  }
}
</script>