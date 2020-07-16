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
          <!-- 강좌 리스트-->
          <v-data-table 
            :headers="headers"
            :items="lectures"
            :search="search"
          >
        <template v-slot:item.actions="{ item }">
          <v-btn class="mr-5" small color="primary" @click="{item}" >학습자료보기</v-btn>
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
    <!-- 개설 강좌-->
    <v-data-table
      :headers="headers2"
      :items="lectures"
      :search="search2"
    >
    <template v-slot:item.actions="{ }"><!--이렇게 해야td안에 들어감 -->
          <v-btn small color="primary" dark class="ml-5" @click="gotmain()">강좌개설하기</v-btn>
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
        searchs:["제목","선생님","학년"],
        search: '',
        courseTabs: ["회원관리", "년도/학기", "공통코드"],
        headers: [
          { text: '강좌명', value: 'lecture_nm' },
          { text: '학년', value: 'grade' },
          { text: '선생님', value: 'teacher_nm' },
          { text: '신청기간', value: 'enroll_ed_dt' },
          { text: '강좌선택', value: 'actions', sortable: false },
        ],
        headers2: [
          { text: '강좌명', value: 'lecture_nm' },
          { text: '학년', value: 'grade' },
          { text: '선생님', value: 'teacher_nm' },
          { text: '신청기간', value: 'enroll_ed_dt' },
          { text: '강좌선택', value: 'actions', sortable: false },
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