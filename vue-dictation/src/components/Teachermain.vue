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
          <!-- 공지사항-->
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
          >
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
    <!-- 받아쓰기 등록-->
    <v-form class="mt-12 pt-4 pr-4 pl-4">
    <div v-for="item in lecture2" :key="item.question_no" > 
    <span>{{" 파일명"+item.file_nm}}</span>
    <v-file-input v-if="dic_empty===0" accept="video/*,audio/*,image/*" @change="processFile1($event, item)" label="업로드"></v-file-input>
    <v-file-input v-else accept="video/*,audio/*,image/*" @change="processFile2($event, item)" label="파일이름이 올라올것"></v-file-input>
    <span>{{item.question_no + ". 받아쓰기 정답등록"}}</span>
    <v-text-field
        :headers="headers2"
        label="정답"
        outlined
        v-model="item.question"
        dense>
    ></v-text-field>
    </div>
    <v-flex class="text-center">
        <v-btn v-if="dic_empty===0" width="270" color="primary" x-large @click="submit()">등록</v-btn>
        <v-btn v-else width="270" color="primary" x-large @click="modify()">수정</v-btn>
    </v-flex>
    </v-form>
    </v-card>
    </v-tab-item>
    <!--학습현황 -->
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
    <!-- 신청현황-->
    <v-tab-item>
       <v-select
              class="float-left mt-6"
              v-model="select"
              :items="sign"
              label="승인구분"
            ></v-select>
             <v-select
              class="float-left mt-6"
              v-model="select"
              :items="identi"
              label="신분"
            ></v-select>
             <v-select
              class="float-left mt-6"
              v-model="select"
              :items="sex"
              label="성별"
            ></v-select>
             <v-select
              class="float-left mt-6"
              v-model="select"
              :items="age"
              label="학년"
            ></v-select>
          <v-card-title>
             <v-select
              class="float-left mt-6"
              v-model="select"
              :items="ban"
              label="반"
            ></v-select>
          </v-card-title>
                      <v-text-field
              v-model="search"
              label="검색"
              single-line
              hide-details
            ></v-text-field>
            <br>
        <v-flex class="text-right">
        <v-btn width="100" color="#FSFSFS" x-medium @click="submit()">엑셀업로드</v-btn>
        <v-btn width="100" color="primary" x-medium @click="removeRow(row)">추가</v-btn>
        <v-btn width="100" color="primary" x-medium @click="removeRow(row)">삭제</v-btn>
        <v-btn width="100" color="primary" x-medium @click="submit()">저장</v-btn>
        <v-btn width="100" color="#FSFSFS" x-medium @click="success()">승인</v-btn>
    </v-flex>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
       <v-data-table
        v-model="selected"
        :headers="headers4"
        :items="lecture3"
        :search="search3"
        item-key="name"
        show-select
        class="elevation-1"
       >
       </v-data-table>
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
        selected: [],
        sign:["신청", "대기중", "승인완료"],
        identi:["학생", "선생님", "관리자"],
        sex:["남", "여"],
        age:["1학년", "2학년","3학년","4학년","5학년","6학년"],
        ban:["1반","2반","3반","4반","5반","6반","7반","9반","10반","11반"],
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
          { text: '이름', value: 'kor_nm' },
          { text: '학년', value: 'grade' },
          { text: '반', value: 'ban' },
          { text: '진도율', value: 'pass_course_no' },
          { text: '연습시간', value: 'study_time' },
          { text: '받아쓰기 점수', value: 'pass_course_no' },
        ],
        headers4: [
          { text: '선택', value: 'checkbox'},
          { text: '승인구분', value: 'approval_cd' },
          { text: '아이디', value: 'user_id' },
          { text: '이름', value: 'kor_nm', sortable: false },
          { text: '성별', value: 'gender_cd' },
          { text: '생년월일', value: 'birth_dt' },
          { text: '학년', value: 'grade' },
          { text: '반', value: 'ban' },
          { text: '연락처', value: 'cel_phone_no' },
          { text: '가입일', value: 'register_dt' },
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
        lecture3:[
        ],
      el: '#choice',
      dic_empty:null,
      //files:[],
      }
  },
    created(){
      this.$http.post('/api/teacher/enroll/list_request').then(res =>{
        //console.log('status code: ${res.ban}');
        this.lecture3=res.data;
      })
      //받아쓰기 등록버튼 or 수정버튼 구별(단계가 없으니 일단은 1로 설정)
      this.$http.get(`/api/teacher/course/dic_empty/${1}`).then(res =>{
          //console.log('status code: ${res.ban}');
          this.dic_empty=res.data;
          if(this.dic_empty==1){//수정
            this.$http.get(`/api/teacher/course/dic_answers/${1}`).then(res =>{
        
              this.lecture2=res.data;
            })
            
            console.log("1입니다!!!!!!!");
          }else{//등록
            console.log("없습니다!!!!");
          }
          //console.log(res);
          //alert(JSON.stringify(this.lectures));
      })
    },
    methods: {
      //등록버튼
      submit() {
        //alert('오는가?');
        for(let item of this.lecture2) {

          const formData = new FormData();
          formData.append('course_no', item.course_no);
          formData.append('question', item.question);
          formData.append('question_no', item.question_no);
          formData.append("file", item.file);
          console.log(item.file);

          //alert('오는가2?');
          this.$http.post('/api/teacher/course',formData).then(res => {
            console.log(res);
            //alert('오는가3?');
            router.push({path: 'tmain'})
          }).catch(err => {
            //alert('오는가4?');
            console.error(err);
          })
        }
    },

    //수정버튼
    modify() {
        //alert('오는가?');
        for(let item of this.lecture2) {

          const formData = new FormData();
          formData.append('course_no', item.course_no);
          formData.append('question', item.question);
          formData.append('question_no', item.question_no);
          formData.append("file_nm", item.file_nm);
          formData.append("change_file ", item.change_file );

          //alert('오는가2?');
          this.$http.post('/api/teacher/course/dic_modify',formData).then(res => {
            console.log(res);
            //alert('오는가3?');
            router.push({path: 'tmain'})
          }).catch(err => {
            //alert('오는가4?');
            console.error(err);
          })
        }
    },
    //승인버튼
    success(){
      for(let item of this.selected) {
        
        this.$http.get(`/api/teacher/enroll/update/${item.user_id}`).then(res =>{
        console.log(res);
        })
        
      }
    },
    //등록
    processFile1(file, item) {
      item.file = file;
    },
    //수정
    processFile2(file, item) {
      item.file_nm = file;
      item.change_file=true;
    }
  }
}
</script>