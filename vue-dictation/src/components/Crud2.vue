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
    <!-- 승인관리-->
    <v-tab-item>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
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
            >New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
  <!-- 회원관리 -->
      <v-data-table
    :headers="headers2"
    :items="desserts2"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
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
            >New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save2">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem2(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem2(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-tab-item>
  <!--년도/학기-->
  <!--소코드-->
  <!--대코드-->
</v-tabs-items>
</v-card>
</template>
<script lang="javascript" src="dist/xlsx.full.min.js"></script>
<script>
import router from '../router'
  export default {
    data: () => ({
    tabs: null,
    courseTabs: ["승인관리", "회원관리","년도/학기", "대코드", "소코드"],
      dialog: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers2:[
          { text: '선택', value: 'calories' },
          { text: '년도', value: 'fat' },
          { text: '학기', value: 'carbs' },
          { text: '관리시작일', value: 'protein' },
          { text: '사용여부', value: 'enroll_ed_dt' },
           { text: 'Actions', value: 'actions', sortable: false },

      ],
      headers3:[

      ],
      headers4:[
          {text: '선택', value: 'checkbox'},
          {text: '대코드', value: 'daecode'},
          {text: '대코드명', value: 'daecodename'},
          {text: '비고', value: 'note'},
      ],
      headers5:[
          {text: '선택', value: 'checkbox'},
          {text: '소코드', value: 'socode'},
          {text: '소코드명', value: 'socodename'},
          {text: '비고', value: 'name'},
      ],
      desserts: [],
      desserts2: [],
      desserts3: [],
      desserts4: [],
      desserts5: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
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
    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editItem2 (item) {
        this.editedIndex = this.desserts2.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      deleteItem2 (item) {
        const index = this.desserts2.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts2.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      save2() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts2[this.editedIndex], this.editedItem)
        } else {
          this.desserts2.push(this.editedItem)
        }
        this.close()
      },
    }
  }
      //엑셀 업로드테스트 엑셀 결과를 lectures으로 보냄 https://godd.tistory.com/41
    //   importExcel(event) {
    //   const file = event.target.files[0];
    //   let reader = new FileReader();
    //   reader.onload = (e) => {
    //     let data = reader.result;
    //     // let data = e.target.result;
    //     let workbook = XLSX.read(data, {type: 'binary'});
    //     workbook.SheetNames.forEach(sheetName => {
    //         const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    //         this.lectures.push(roa);
    //       });
    //   };
    //   reader.readAsBinaryString(file);
</script>