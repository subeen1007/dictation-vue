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
            :items="notice"
            :loading="loading"
            sort-by="seq_no" 
            sort-desc="false" 
            :single-expand="singleExpand"
            :expanded.sync="expanded1"
            class="elevation-1"
            item-key="seq_no"
            show-expand
          >
         
          <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>공지 사항</v-toolbar-title>
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
              <v-form>
                <v-file-input v-model="editedItem001.file" @change="boardFile1($event, editedItem001)" label="업로드"></v-file-input>
                <v-divider></v-divider>
                <v-text-field
                  v-model="editedItem001.title"
                  label="제목"
                  single-line
                  full-width
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-textarea
                  v-model="editedItem001.content"
                  label="내용"
                  counter
                  maxlength="2000"
                  full-width
                  single-line
                ></v-textarea>
              </v-form>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">취소</v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem001)">저장</v-btn>
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
    <!--공지사항 내용-->
      <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">제목: {{ item.title }}<br><br>내용: {{ item.content }}</td>
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
    <!-- 공지사항 읽기 팝업 --> 
     <v-dialog v-model="dlRead" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{rd.title}}</span>
        </v-card-title>
        <v-card-text>
          {{rd.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dlRead = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 팝업 끝-->
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
    <v-card-text class="pt-0">
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
    </v-card-text>
    <v-form class="mt-12 pt-4 pr-4 pl-4">
    <div v-for="item in lecture2" :key="item.question_no" > 
    <span>{{" 파일명"+item.file_nm}}</span>
    <v-file-input v-if="max_dic_course<step_value" accept="video/*,audio/*,image/*" @change="processFile1($event, item)" label="업로드"></v-file-input>
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
        <v-btn v-if="max_dic_course<step_value" width="170" color="primary" x-large @click="submit()">등록</v-btn>
        <v-btn v-else width="170" color="primary" x-large @click="modify()">수정</v-btn>
        <v-btn v-if="lecture2[1].finish_yn==='1'" width="170" color="disabled" x-large >완료</v-btn>
        <v-btn v-else width="170" color="primary" x-large @click="finish()">완료</v-btn>
        
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
          <!-- 엑셀업로드 -->
          <template>
            <v-dialog v-model="excel_dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      width="100"
                      x-medium
                      color="#FSFSFS"
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >엑셀업로드</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">엑셀업로드</span>
                    </v-card-title>

                    <v-card-text>  
                      <v-file-input @change="excelFile1($event)" label="업로드"></v-file-input>                                  
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                      <v-btn color="blue darken-1" text @click="excel_save(excel_file)">저장</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
          
          </template>
          <!-- 엑셀업로드 끝 -->
        <!-- <v-btn width="100" color="#FSFSFS" x-medium @click="submit()">엑셀업로드</v-btn> -->
        <v-btn width="100" color="primary" x-medium @click="addRow()">추가</v-btn>
        <v-btn width="100" color="primary" x-medium @click="removeRow()">삭제</v-btn>
        <v-btn width="100" color="primary" x-medium @click="save_request()">저장</v-btn>
        <v-btn width="100" color="#FSFSFS" x-medium @click="success()">승인</v-btn>
    </v-flex>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
      <v-data-table
        v-model="selected"
        :headers="headers4"
        :items="lecture3"
        :search="search3"
        :single-select="singleSelect"
        item-key="user_id"
        show-select
        class="elevation-1"
      >
      </v-data-table>
     </v-card>
    </v-tab-item>
    <!--QnA-->
    <v-tab-item>
      <v-data-table
            :headers="headers5"
            :items="notice2"
            :loading="loading"
            sort-by="seq_no"
            sort-desc="false"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            class="elevation-1"
            item-key="title"
            show-expand
            
          >
          <template v-slot:top>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">제목: {{ item.title }}<br><br>내용: {{ item.content }}</td>
          
        </template>
          <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>질문게시판</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog_qna" max-width="500px">
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
              <v-form>
                <v-file-input v-model="editedItem003.file" @change="boardFile1($event, editedItem003)" label="업로드"></v-file-input>
                <v-divider></v-divider>
                <v-text-field
                  v-model="editedItem003.title"
                  label="제목"
                  single-line
                  full-width
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-textarea
                  v-model="editedItem003.content"
                  label="내용"
                  counter
                  maxlength="2000"
                  full-width
                  single-line
                ></v-textarea>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">취소</v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem003)">저장</v-btn>
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
    <template >
      <!--<v-icon
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
      </v-icon>-->
    </template>
        </v-data-table>
    </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import router from '../router'
  export default {
    created(){
      //신청현황 리스트
      this.$http.post('/api/teacher/enroll/list_request').then(res =>{
        //console.log('status code: ${res.ban}');
        this.lecture3=res.data;
        for(let lec of this.lecture3){
          lec.gender_cd=lec.gender_cd==="002001" ? "남":"여";
        }
      })

      //처음에 받아쓰기 들어갔을떄 화면(등록할 화면 또는 제일 마지막화면 나옴)
      this.$http.get(`/api/teacher/course/max_dic_course`).then(res =>{//선생님화면 등록한 받아쓰기 최대단계
          //console.log('status code: ${res.ban}');
          this.max_dic_course=res.data;
          this.step_value = (this.max_dic_course + 1) || 40
          this.isdictation(this.step_value);
        })

      //공지사항 목록 불러오기
      this.$http.get(`/api/board/list/${"006001"}`).then(res =>{
          this.notice=res.data;
        })
        //질문하기 불러오기
        this.$http.get(`/api/board/list/${"006003"}`).then(res =>{
          this.notice2=res.data;
        })
      
    },

    data () {
      return {
        excel_dialog: false,
        dialog_qna: false,
        dialog: false,
        dlRead: false,
        expanded: [],
        expanded1: [],//공지사항 내용
        singleExpand: true,
        rd: {
        title: '',
        content: ''
      },
        step_value: 1,
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
          { text: '제목', value: 'title', sortable: false, align:'left'},
          { text: '작성자', value: 'input_id' },
          { text: '파일', value: 'file_nm'},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem001: {
          title: '',
          content: '',
          file:null,
          board_cd:'001',
        },
        editedItem003: {
          title: '',
          content: '',
          file:null,
          board_cd:'003',
        },
        defaultItem: {
          title: '',
          content: '',
          file_nm:null,
          board_cd:'001',
        },
        notice: [

        ],
        notice2:[

        ],
        editedIndex: -1,
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
        headers5: [
          { text: '제목', value: 'title' },
          { text: '작성자', value: 'input_id' },
          { text: '파일', value: 'file_nm'},
        ],
        lecture2: [
        ],
        lecture3:[
        ],
        lecture_value: [
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
      max_dic_course:0,
      submit_yn:1,//등록가능 여부(가능1, 불가능0)
      excel_file:null,//엑셀업로드 파일
      }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? '글 작성하기' : '글 수정하기'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog_qna (val) {
        val || this.close()
      },
    },
    created2 () {
      this.initialize()
    },
    methods: {
      //공지사항 읽기 테스트
      //read () {
      //this.rd.title = atc.title
      //this.loading = true
      //this.$http.get(`/api/board/list/${this.no}/${this.seq_no}`)
    //
      initialize () {
        this.notice = [
        ]
      },
      //공지사항 수정
      editItem (item) {
        this.editedIndex = this.notice.indexOf(item)
        this.editedItem001 = Object.assign({}, item)
        this.dialog = true
      },
      // 공지사항 삭제
      deleteItem (item) {
        const index = this.notice.indexOf(item)
        confirm('정말로 삭제하시겠습니까?') && this.notice.splice(index, 1)
        this.$http.get(`/api/board/delete/${item.board_cd}/${item.no}/${item.seq_no}`).then(res =>{
          console.log(res);
          router.push({name: 'tmain'});
        })
      },
      close () {
        this.excel_file=null
        this.dialog = false
        this.dialog_qna=false
        this.excel_dialog=false
        this.$nextTick(() => {
          this.editedItem001 = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },


      //엑셀업로드 저장
      excel_save(item){
        if(item==null){
          alert("엑셀 파일을 업로드 해주세요");
        }else{
          const formData = new FormData();
          formData.append("file",item);
          this.$http.post('/api/teacher/excelup',formData).then(res =>{
              console.log(res);
              this.close()
              if(res.data==0){
                alert("엑셀 파일 업로드 완료");
              }else if(res.data==1){
                alert("엑셀 파일 업로드를 실패했습니다");
              }

            }) 
        }
      },
      //공지사항 저장
      save (item) {
    
        if (this.editedIndex > -1) { //게시판 글수정 update
          Object.assign(this.notice[this.editedIndex], item)
          //board_cd, no, seq_no, title, content
          const formData = new FormData();
          formData.append("board_cd",this.editedItem001.board_cd);
          formData.append("no",this.editedItem001.no);
          formData.append("seq_no",this.editedItem001.seq_no);
          formData.append("content",this.editedItem001.content);
          formData.append("title",this.editedItem001.title);

          if(this.editedItem001.file==null){//파일없음
            this.$http.post('/api/board/update_nofile',formData).then(res =>{
              console.log(res);
              router.push({name: 'tmain'});
            })    
          }else{//파일있음
            formData.append("file",this.editedItem001.file);
            this.$http.post('/api/board/update',formData).then(res =>{
              console.log(res);
              router.push({name: 'tmain'});
            })    
          }
        
        } else { //게시판 글등록 insert
          this.notice.push(item)

          const formData = new FormData();
          formData.append("board_cd",item.board_cd);
          formData.append("content",item.content);
          formData.append("title",item.title);
          if(item.file==null){//파일없음
            this.$http.post('/api/board/insert_nofile', formData).then(res =>{
              console.log(res);
            })
          }else{//파일있음
            formData.append("file",item.file);
              this.$http.post('/api/board', formData).then(res =>{
              console.log(res);
            })
          }
        }
        
        this.close()
        location.reload(true);
      },
      //받아쓰기 단계가 바뀌면 해당단계를 lecture2에 적용(등록일때)
      isdictation(value){
        for(let item of this.lecture_value){
          item.course_no=value;
        }
        this.lecture2=this.lecture_value
      },
      //등록버튼
      submit() {
        this.submit_yn=1;
        for(let item1 of this.lecture2){
          if(item1.file===null){
            alert("파일을 모두 입력해주세요");
            this.submit_yn=0;//등록못함
            return;
          }
        }
        console.log("1111111111111111");
        if(this.submit_yn==1){
          console.log("22222222222");
          for(let item of this.lecture2) {
          const formData = new FormData();
          formData.append('course_no', item.course_no);
          formData.append('question', item.question);
          formData.append('question_no', item.question_no);
          formData.append("file", item.file);
          console.log(item.file);
          console.log("333333333333");

          this.$http.post('/api/teacher/course',formData).then(res => {
            console.log(res);
            console.log("34444444444444");
            router.push({path: 'tmain'})
          }).catch(err => {
            //alert('오는가4?');
            console.error(err);
          })
        }

      }
        
    },

    //받아쓰기 수정버튼
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
    //신청현황 추가버튼
    addRow(){
      
    },
    //신청현황 삭제버튼
    removeRow(){
      for(let item of this.selected){
        this.lecture3.splice(this.lecture3.indexOf(item),1);
      }
    },
    //신청현황 저장버튼
    save_request(){
      this.$http.post('/api/teacher/users/list_request_save',this.lecture3).then(res =>{
        console.log(res);
      })
    },
    //신청현황 승인버튼
    success(){
      for(let item of this.selected) {
        
        this.$http.get(`/api/teacher/enroll/update/${item.user_id}`).then(res =>{
        console.log(res);
        })
        
      }
    },
    excelFile1(file){
      this.excel_file=file;
    },
    //게시판에 파일 업로드
    boardFile1(file, item){
      item.file=file;
    },
    //받아쓰기 등록
    processFile1(file, item) {
      item.file = file;
    },
    //받아쓰기 수정
    processFile2(file, item) {
      item.file_nm = file;
      item.change_file=true;
    },
    minus_step(){
      this.step_value = (this.step_value - 1) || 1
      //받아쓰기 수정버튼
      this.$http.get(`/api/teacher/course/dic_answers/${this.step_value}`).then(res =>{
        this.lecture2=res.data;
      })
    },
    plus_step(){
      if(this.max_dic_course>this.step_value){//수정
        this.step_value = (this.step_value + 1) || 40
        this.$http.get(`/api/teacher/course/dic_answers/${this.step_value}`).then(res =>{
          this.lecture2=res.data;
        })
      }else if(this.max_dic_course==this.step_value){//등록
        this.step_value = (this.step_value + 1) || 40
        this.isdictation(this.step_value);
        alert("단계를 등록하세요")
      }else{
        alert("이번단계를 먼저 등록해야 합니다.")
      }
    },
    //받아쓰기 완료버튼 눌렀을떄
    finish(){
        //alert('오는가2?');
        if(this.max_dic_course<this.step_value){
          alert("받아쓰기를 먼저 등록하세요");
        }else{
          this.$http.get(`/api/dictation/course/finish_yes/${this.lecture2[1].course_no}`).then(res => {
            console.log(res);
            alert("받아쓰기를 완료했습니다.");
          })
        }
    }
  }
}
</script>