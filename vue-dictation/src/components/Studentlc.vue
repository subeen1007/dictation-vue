<template>
  <v-card class="mx-auto">
    <v-toolbar
      color="primary lighten-1"
      dark
      flat
    >
    <v-toolbar-title>강좌 이름</v-toolbar-title>
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
      :items="lecture"
      :search="search"
    ></v-data-table>
    </v-card>
    </v-tab-item>
    <v-tab-item>
              <v-card flat>
          <v-card-text>
            api 사용 여부에따라 추후 구성
          </v-card-text>
        </v-card>
    </v-tab-item>
    <v-tab-item>
    <v-card class="mx-auto">
    <v-card-title>
      글쓰기 vue추가
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
      :items="lecture"
      :search="search"
    ></v-data-table>
     </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        lectureTitles:["신청강좌","공지사항","Q&A"],
        tabs: null,
                search: '',
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
        lecture1: [
          {
            lecture_nm: '2반 받아쓰기',
            grade: 1,
            teach_id: '사오정',
            enroll_en_dt: '5.16-6.26',
            lecture_level: '70점',
          },   
        ],
        headers: [
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
      }
    },
  }
</script>