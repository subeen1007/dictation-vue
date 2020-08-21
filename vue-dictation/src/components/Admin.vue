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
        <v-btn width="100" color="#FSFSFS" x-medium @click="submit()">승인</v-btn>
    </v-flex>
    <v-flex class="text-left">
    <v-btn width="100" color="primary" x-medium @click="selectAll">모두 선택</v-btn>
    <v-btn width="100" color="#FSFSFS" x-medium @click="reset">모두 해제</v-btn>
    

    </v-flex>
          <!-- 회원관리-->
          <v-data-table
          v-model="selected"
          :headers="headers"
          :items="lectures"
          :search="search2"
          :single-select="singleSelect"
          item-key="user_id"
          show-select
          class="elevation-1"
          >
    </v-data-table>
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
    <!-- 년도/학기-->
     <v-flex class="text-right">
    <v-btn small color="primary" dark class="ml-5" @click="addRow">추가</v-btn>
    <v-btn small color="primary" dark class="ml-5" @click="yearsave()">저장</v-btn>
     </v-flex>
    <v-data-table
      v-model="selected"
      :headers="headers2"
      :items="rows"
      :search="search2"
      :single-select="singleSelect"
      item-key="user_id"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    </v-card>
    </v-tab-item>
         <v-tab-item>
           <!-- 대코드-->
           <v-flex class="text-right">
    <button class="button btn-primary" @click="addRow2">추가하기</button>
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">삭제</v-btn>
    <v-btn small color="primary" dark class="ml-5" @click="daecodesave()">저장</v-btn>
     </v-flex>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
       <v-data-table
        v-model="selected"
        :headers="headers3"
        :items="rows2"
        :single-select="singleSelect"
        item-key="user_id"
        show-select
        class="elevation-1"
       >
       </v-data-table>
     </v-card>
    </v-tab-item>
         <v-tab-item>
           <!-- 소코드-->
           <v-flex class="text-right">
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">삭제</v-btn>
    <v-btn small color="primary" dark class="ml-5" @click="socodesave()">저장</v-btn>
     </v-flex>
     <v-card class="mx-auto">
      <v-spacer></v-spacer>
       <v-data-table
        v-model="selected"
        :headers="headers4"
        :items="rows3"
        :single-select="singleSelect"
        item-key="user_id"
        show-select
        class="elevation-1"        
       ></v-data-table>
     </v-card>
    </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script lang="javascript" src="dist/xlsx.full.min.js"></script>
<script>
import router from '../router'
  export default {
    
    data () {
      return {
        tabs: null,
        sign:["신청", "대기중", "승인완료"],
        identi:["학생", "선생님", "관리자"],
        sex:["남", "여"],
        age:["1학년", "2학년","3학년","4학년","5학년","6학년"],
        ban:["1반","2반","3반","4반","5반","6반","7반","9반","10반","11반"],
        search: '',
        courseTabs: ["회원관리", "년도/학기", "대코드", "소코드"],
        headers: [
          { text: '승인구분', value: 'grade' },
          { text: '신분', value: 'position_cd' },
          { text: '아이디', value: 'user_id' },
          { text: '이름', value: 'kor_nm', sortable: false },
          { text: '성별', value: 'gender_cd' },
          { text: '생년월일', value: 'birth_dt' },
          { text: '학년', value: 'grade' },
          { text: '반', value: 'ban' },
          { text: '연락처', value: 'cel_phone_no' },
          { text: '가입일', value: 'register_dt' },
        ],
        headers2: [
          { text: '년도', value: 'grade' },
          { text: '학기', value: 'teacher_nm' },
          { text: '관리시작일', value: 'enroll_ed_dt' },
          { text: '관리종료일', value: 'actions', sortable: false },
          { text: '사용여부', value: 'enroll_ed_dt' },
        ],
        headers3: [
          {text: '대코드', value: 'daecode'},
          {text: '대코드명', value: 'daecodename'},
          {text: '비고', value: 'note'},
        ],
        headers4: [
          {text: '소코드', value: 'socode'},
          {text: '소코드명', value: 'socodename'},
          {text: '비고', value: 'name'},
        ],
        lectures:[
          
        ],
        selected: [],
      }
    },
    created(){
    this.$http.get('/api/common/lecture/list').then(res =>{
          console.log('status code: ${res.ban}');
          this.lectures=res.data;
          //console.log(res);
          //alert(JSON.stringify(this.lectures));
    }
    )
  },
    methods: {
      //회원관리 저장
      gonewstudy(){
        router.push({name: 'stwr'});
      },
      //년도/학기 저장
      yearsave(){
        router.push({name: 'stwr'});
      },
      //대코드 저장
      daecodesave(){
        router.push({name: 'stwr'});
      },
      //소코드 저장
      socodesave(){
        router.push({name: 'stwr'});
      },
      //로그인 화면으로가기
      gotmain(){
        router.push({name: 'Home'});
      },
      //엑셀 업로드테스트 엑셀 결과를 lectures으로 보냄 https://godd.tistory.com/41
      importExcel(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = reader.result;
        // let data = e.target.result;
        let workbook = XLSX.read(data, {type: 'binary'});
        workbook.SheetNames.forEach(sheetName => {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            this.lectures.push(roa);
          });
      };
      reader.readAsBinaryString(file);
      },
    }
  }
</script>