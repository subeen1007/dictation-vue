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
        <v-btn width="100" color="primary" x-medium @click="submit()">추가</v-btn>
        <v-btn width="100" color="primary" x-medium @click="submit()">삭제</v-btn>
        <v-btn width="100" color="primary" x-medium @click="submit()">저장</v-btn>
        <v-btn width="100" color="#FSFSFS" x-medium @click="submit()">승인</v-btn>
        <thead>
                <tr class="heading">
                    <th width="50">
                        <input type="checkbox" v-model="allMarked"/>
                    </th>
                    <slot name="header"></slot>
                </tr>
                <tr class="filter">
                    <td></td>
                    <slot name="filter"></slot>
                </tr>
            </thead>
    </v-flex>
          <!-- 강좌 리스트-->
          <v-data-table 
            :type="checkbox"
            :headers="headers"
            :items="lectures"
            :search="search"
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
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">추가</v-btn>
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">삭제</v-btn>
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">저장</v-btn>
    <!-- 회원관리-->
    <v-data-table
      :headers="headers2"
      :items="lectures"
      :search="search2"
    >
    <template v-slot:item="row">
        <tr>
          <td><input type="checkbox" id="checkbox"></td>
          <td>{{row.item.lecture_nm}}</td>
          <td>{{row.item.position_cd}}</td>
          <td>{{row.item.teacher_nm}}</td>
          <td>{{row.item.enroll_ed_dt}}</td>
        </tr>
    </template>
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
        sign:["신청", "대기중", "승인완료"],
        identi:["학생", "선생님", "관리자"],
        sex:["남", "여"],
        age:["1학년", "2학년","3학년","4학년","5학년","6학년"],
        ban:["1반","2반","3반","4반","5반","6반","7반","9반","10반","11반"],
        search: '',
        courseTabs: ["회원관리", "년도/학기", "공통코드"],
        headers: [
          { text: '선택', value: 'checkbox'},
          { text: '번호', value: 'lecture_nm' },
          { text: '승인구분', value: 'grade' },
          { text: '신분', value: 'position_cd' },
          { text: '아이디', value: 'enroll_ed_dt' },
          { text: '이름', value: 'actions', sortable: false },
          { text: '성별', value: 'enroll_ed_dt' },
          { text: '생년월일', value: 'enroll_ed_dt' },
          { text: '학년', value: 'enroll_ed_dt' },
          { text: '반', value: 'enroll_ed_dt' },
          { text: '연락처', value: 'enroll_ed_dt' },
          { text: '가입일', value: 'enroll_ed_dt' },
        ],
        headers2: [
          { text: '선택', value: 'lecture_nm' },
          { text: '년도', value: 'grade' },
          { text: '학기', value: 'teacher_nm' },
          { text: '관리시작일', value: 'enroll_ed_dt' },
          { text: '관리종료일', value: 'actions', sortable: false },
          { text: '사용여부', value: 'enroll_ed_dt' },
        ],
        lectures:[

        ],
      }
    },
    created(){
    this.$http.get('/api/lecture/list').then(res =>{
          console.log('status code: ${res.ban}');
          this.lectures=res.data;
          //console.log(res);
          //alert(JSON.stringify(this.lectures));
    }
    )
  },
    methods: {
      gonewstudy(){
        router.push({name: 'stwr'});
      },
      gotmain(){
        router.push({name: 'tmain'});
      }
    }
  }
</script>