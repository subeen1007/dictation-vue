<template>
  <v-container align-center>
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
 <v-form class="mt-12 pt-4 pr-4 pl-4">
   <div v-for="item in answers" :key="item.question_no"> 
     <v-file-input @change="processFile($event)" label="upload"></v-file-input>
     <span>{{item.question_no + ". 받아쓰기 정답등록"}}</span>
    <v-text-field 
              label="정답"
              outlined
              v-model="item.question"
              dense>
    </v-text-field>
  </div>
   <!-- <v-textarea
    
      label="질문글"
    ></v-textarea>-- -->
     <v-flex class="text-center">
        <v-btn width="270" color="primary" x-large @click="test()">등록</v-btn>
    </v-flex>
 </v-form>
</v-container>
</template>
<script>
import router from '../router'
export default {
  data: () => ({
    answers: [
      {question_no: 1, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null },
      {question_no: 2, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 3, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 4, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 5, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 6, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 7, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 8, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 9, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 10, question: '', year: "2020", term: "1", lecture_no: null, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      ],
      el: '#choice',
     items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      fileTest: ''
  }),
  methods: {
    test() {
      
      for(let item of this.answers) {
       
        this.$http.post('/api/teacher/course',item).then(res => {
          console.log(res);
          router.push({path: '/home'})
        }).catch(err => {
          console.error(err);
        })
      }
     
    },
    processFile(file) {
      this.fileTest = file;
    }
  }
}
</script>