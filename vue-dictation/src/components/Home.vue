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
    <v-btn small color="primary" dark class="ml-5" @click="gonewstudy()">강좌개설하기</v-btn>
    <v-data-table
      :headers="headers2"
      :items="lecture2"
      :search="search2"
    ></v-data-table>
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
        courseTabs: ["강좌리스트", "개설강좌"],
        headers: [
          { text: '강좌명', value: 'courseName' },
          { text: '학년', value: 'grade' },
          { text: '선생님', value: 'teacher' },
          { text: '신청기간', value: 'courseDate' },
          { text: '강좌선택', value: 'actions', sortable: false },
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
            text: '강좌명',
            align: 'start',
            sortable: false,
            value: 'lecture_nm',
          },
          { text: '학년', value: 'grade' },
          { text: '반', value: 'ban' },
          { text: '학생이름', value: 'kor_nm' },
          { text: '점수', value: 'lecture_level' },
        ],
        lecture3: [
        {
            lecture_nm: '2반 받아쓰기',
            grade: 1,
            ban: 5,
            kor_nm: '강대성',
            lecture_level: '70점',
        },   
        ],
      }
    },
    methods: {
      gonewstudy(){
        router.push({name: 'stwr'});
      },
      goCource() {
        router.push({name: 'sWrite'});
      }
    }
  }
</script>