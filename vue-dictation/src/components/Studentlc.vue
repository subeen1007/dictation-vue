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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >글 작성하기</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.content" label="내용"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-file-input @change="boardFile1($event)" label="업로드"></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">취소</v-btn>
              <v-btn color="blue darken-1" text @click="save">저장</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dlRead" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          {{formTitle}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dlRead = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
  
     <v-flex class="text-center">
        <v-btn v-if="(this.step_value < this.pass_course_no+1) || (this.step_value === this.pass_course_no+1)" width="270" color="primary" x-large @click="answersubmit()">제출</v-btn>
    </v-flex>
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

      <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
          <v-card-title class="headline">당신의 점수는?</v-card-title>
          <v-card-text>{{this.score}} 점입니다.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="again()">다시하기</v-btn>
            <v-btn color="green darken-1" text @click="goLecture()">그만하기</v-btn>
            <v-btn v-if="this.score===100" color="green darken-1" text @click="next()">다음단계</v-btn>
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
        notice:[],
        notice2:[],
        expanded: [],
        singleExpand: false,
        finish_yes_cl:[],//강좌에 대해 받아쓰기 완료처리된 단계들만 반환
        lecture_info:[],//강좌정보
        step_value: 1,
        pass_course_no: 0,
        lectureTitles:["신청강좌","공지사항","질문하기","받아쓰기하기"],
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
          { text: 'Actions', value: 'actions', sortable: false },
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
        editedIndex: -1,
        editedItem: {
          title: '',
          content: '',
          file:null,
          board_cd:'003',
        },
        defaultItem: {
          title: '',
          content: '',
          file_nm:null,
          board_cd:'003',
        },
        score: 0,
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

      //받아쓰기 들어가면 학생이 통과한 단계로 설정
      this.$http.get(`api/student/enroll/what_pass_course`).then(res => {
            this.pass_course_no=res.data;
            this.step_value=(this.pass_course_no + 1) || 40
      })
      
      //강좌정보 가져옴
      this.$http.get(`api/common/lecture/get`).then(res => {
            this.lecture_info=res.data;
      })


      //받아쓰기 음성파일 url주소 반환
      for(let answer of this.answers){
        const formData=new FormData();
        formData.append("course_no",answer.course_no);
        formData.append("question_no",answer.question_no);
        this.$http.post('/api/dictation/course/audio',formData).then(res =>{
              answer.fileUrl=res.data;
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
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
      watch: {
        dialog (val) {
          val || this.close()
        },
      },
      created2 () {
        this.initialize()
      },

    methods: {
      initialize () {
        this.notice = [
        ]
      },
      //공지사항 수정
      editItem (item) {
        this.editedIndex = this.notice.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.$http.get(`/api/board/update`).then(res =>{
          console.log(res);
          router.push({name: 'tmain'});
        })
      },
      // 공지사항 삭제
      deleteItem (item) {
        const index = this.notice.indexOf(item)
        confirm('정말로 삭제하시겠습니까?') && this.notice.splice(index, 1)
        this.$http.get(`/api/board/delete/${item.no}/${item.seq_no}`).then(res =>{
          console.log(res);
          router.push({name: 'tmain'});
        })
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      //공지사항 저장
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.notice[this.editedIndex], this.editedItem)
        } else {
          this.notice.push(this.editedItem)
        }
        const formData = new FormData();
        formData.append("board_cd",this.editedItem.board_cd);
        formData.append("content",this.editedItem.content);
        formData.append("title",this.editedItem.title);
        if(this.editedItem.file==null){//파일없음
          this.$http.post('/api/board/insert_nofile', formData).then(res =>{
            console.log(res);
          })
        }else{//파일있음
          formData.append("file",this.editedItem.file);
            this.$http.post('/api/board', formData).then(res =>{
            console.log(res);
          })
        }
        this.close()
      },
      boardFile1(file){
      this.editedItem.file=file;
      },
     answersubmit() {
      //학생의 받아쓰기 데이터 DB study테이블에 insert
      for(let a of this.answers){
        const formData1=new FormData();
        formData1.append("course_no",a.course_no);
        formData1.append("question_no",a.question_no);
        formData1.append("answer",a.question);    

        this.$http.post('/api/dictation/study/insert',formData1).then(res =>{
          console.log(res);    
        })
      }

      this.score = 0;
      let i =0;
      //점수 알려줌
      this.$http.post('api/dictation/enroll/answer', this.answers).then(res => {
        for(let answer of res.data) {
          
          if(answer) {
            this.score += 10;
          }else {
            this.answers[i].error = true;
          }
          i++;
        }
        //100점 맞으면 DB enroll테이블의 pass_course_no(통과한 단계번호)을 update
        if(this.score===100){
          this.$http.get(`api/student/enroll/update/${this.step_value}`).then(res => {
            console.log(res);
          })
          this.what_pass_course()
        }
  
        this.dialog = true;
      }).catch( err => {
        console.log(err);
      }) 
      
    },
    again() {
      for(let i in this.answers) {
        this.answers[i].error = false;
        //this.answers[i].question = "";
      }
      this.dialog = false
    },
    goLecture() {
      location.reload(true);
      router.push({path: '/studentlc'})
    },
    next() {
      for(let i in this.answers) {
        this.answers[i].error = false;
        this.answers[i].question = "";
      }
      this.dialog = false
      this.plus_step()
    },
    //pass_course를 반환
    what_pass_course(){
      this.$http.get(`api/student/enroll/what_pass_course`).then(res => {
            this.pass_course_no=res.data;
      })
    },
    minus_step(){
      this.step_value = (this.step_value - 1) || 1
      for(let answer of this.answers){
        answer.course_no=this.step_value;
        answer.question = "";
      }
    },
    plus_step(){
      
      this.step_value = (this.step_value + 1) || 40
      for(let answer of this.answers){
        answer.course_no=this.step_value;
        answer.question = "";
      }
    }
  }
}
</script>