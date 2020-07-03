<template>
  <v-card class="mx-auto">
    <v-card-title>
      신청하기
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
          <v-btn v-if="item.lecture_check === '미신청'" class="mr-5" small color="primary" @click="sumbit(item.id)">신청하기</v-btn>
          <v-btn v-else small color="primary" @click="cancle(item.id)">신청취소</v-btn>
      </template></v-data-table>
  </v-card>
</template>

<script>
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
          { text: '신청기간', value: 'enroll_st_dt' },
          { text: '신청여부', value: 'lecture_check' },
          { text: '강좌신청', value: 'actions', sortable: false },
        ],
        lecture: [
          {
            id:0,
            lecture_nm: '1반 받아쓰기',
            grade: 1,
            kor_nm: '홍길동',
            enroll_st_dt: '5.16-6.23',
            lecture_check: '미신청',
          },
          {
            id:1,
            lecture_nm: '2반 받아쓰기',
            grade: 1,
            kor_nm: '사오정',
            enroll_st_dt: '5.16-6.23',
            lecture_check: '신청완료',
          },
          
        ],
      }
    },
    methods: {
      sumbit(id) {
        this.lecture[id].lecture_check = "신청완료"
      },
      cancle(id) {
        this.lecture[id].lecture_check = "미신청"
      }
    }
  }
</script>