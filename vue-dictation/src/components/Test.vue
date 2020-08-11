<template>
  <v-data-table
    :headers="headers"
    :items="notice"
    sort-by="title"
    class="elevation-1"
  >
  <template slot="items" slot-scope="props">
      <td :class="headers[0].class"><a small flat class="text-capitalize" left @click="read(props.item)"> {{ props.item.title }}</a></td>
  </template>
  <!-- 예시
  <template slot="items" slot-scope="props">
            <td :class="headers[0].class">{{ id2date(props.item._id)}}</td>
            <td :class="headers[1].class"><a small flat class="text-capitalize" left @click="read(props.item)"> {{ props.item.title }}</a></td>
            <td :class="headers[2].class">{{ props.item._user ? props.item._user.id : '손님' }}</td>
            <td :class="headers[3].class">{{ props.item.cnt.view }}</td>
            <td :class="headers[4].class">{{ props.item.cnt.like }}</td>
  </template>
  -->
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
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.content" label="내용"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.input_id" label="작성자"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-file-input accept="video/*,audio/*,image/*" @change="processFile1($event, item)" label="업로드"></v-file-input>
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '제목', value: 'title' },
        { text: '내용', value: 'content' },
        { text: '작성자', value: 'input_id' },
        { text: '파일', value: 'file_nm'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      notice: null,
      editedIndex: -1,
      editedItem: {
        title: '',
        content: '',
        input_id: '',
        file_nm:null,
        board_cd:'001',
      },
      defaultItem: {
        title: '',
        content: '',
        input_id: '',
        file_nm:null,
        board_cd:'001',
      },
    }),
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
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.notice = [
        ]
      },
      editItem (item) {
        this.editedIndex = this.notice.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.notice.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.notice.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      //게시판 저장
      save () {
        this.$http.post('/api/board', this.editedItem).then(res =>{
          console.log(res);
        })
        this.close()
      },
      //등록
    processFile1(file, item) {
      item.file = file;
    },
    //수정
    processFile2(file, item) {
      item.file_nm = file;
      item.change_file=true;
    }
    }
  }
</script>