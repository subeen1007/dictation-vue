<template>
  <v-card class="mx-auto">
    <v-card-title>
      수강하기
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
    >
      <template v-slot:item.actions="{ item }">
      <v-btn class="mr-5" small color="primary" @click="goCource(item)">시작하기</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import router from '../router'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: '강좌명',
            align: 'start',
            sortable: false,
            value: 'lecture_nm',
          },
          { text: '학년', value: 'grade' },
          { text: '선생님', value: 'kor_nm' },
          { text: '수강기간', value: 'enroll_st_dt' },
          { text: '받아쓰기', value: 'actions', sortable: false },
        ],
        lecture: [
          {
            lecture_nm: '2반 받아쓰기',
            grade: 1,
            kor_nm: '사오정',
            enroll_st_dt: '5.16-6.26',
            lecture_enter: '시작하기',
          },
        ],
      }
    },
    methods: {
      goCource() {
        router.push({name:'sWrite'})
      }
    }
  }
</script>