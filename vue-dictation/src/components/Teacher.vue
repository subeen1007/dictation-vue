<template>
  <v-container align-center>
 <v-form class="mt-12 pt-4 pr-4 pl-4">
  <v-file-input @change="processFile($event)" label="upload"></v-file-input>
   <div v-for="item in answers" :key="item.question_no"> 
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
      {question_no: 1, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null },
      {question_no: 2, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 3, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 4, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 5, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 6, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 7, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 8, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 9, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      {question_no: 10, question: '', year: "2020", term: "1", lecture_no: 1, course_no: 1, file_nm: null, file_save_nm: null, input_id: null, updated_id: null,update_date: null},
      ],
      fileTest: ''
  }),
  methods: {
    test() {
      
     

      for(let item of this.answers) {
       
        this.$http.post('/api/course',item).then(res => {
          console.log(res);
          router.push({path: '/home'})
        }).catch(err => {
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
    processFile(file) {
      this.fileTest = file;
    }
  }
}
</script>