<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <!-- <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group> -->
          <v-list-item
            v-if="item.isOpen"
            :key="item.text"
            :to="{path: item.path}"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>         
        </template>
        <v-list-item v-if="!isSignIn" @click="$store.dispatch('logout')" >
            <v-list-item-content>
              <v-list-item-title>
              Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Dictation</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >

          <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'App',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
  
      {icon:'mdi-home',  text: '선생님 메인화면' ,path:'/home', isOpen: false},
      {icon:'mdi-home',  text: '학생 메인화면', path:'/viewlc',isOpen: false},
      //{ text: '수강강좌', path:'/readlc',isOpen: false},
      //{ text: '학생강좌화면', path:'/studentlc',isOpen:false},
      //{ text: '받아쓰기등록', path:'/write',isOpen:false},
      {icon: 'mdi-account', text: '마이페이지', path:'/Mypage', isOpen:false},
      { icon: 'mdi-account-arrow-left', text: 'SignIn', path:'/',isOpen: false},
      { icon: 'mdi-account-plus', text: 'SignUp', path:'/sign-up', isOpen:false},
        // { icon: 'mdi-content-copy', text: 'Duplicates' },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
        // { icon: 'mdi-settings', text: 'Settings' },
        // { icon: 'mdi-message', text: 'Send feedback' },
        // { icon: 'mdi-help-circle', text: 'Help' },
        // { icon: 'mdi-cellphone-link', text: 'App downloads' },
        // { icon: 'mdi-keyboard', text: 'Go to the old version' },
      ],
  }),
  components: {
  
  },
  computed: {
    ...mapState(['isSignIn','SorT'])
  },
  watch:{
    isSignIn : function() {
      this.items[3].isOpen = this.isSignIn,
      this.items[4].isOpen = this.isSignIn
    },
    SorT : function(data) {
      if(data !== "학생"){//선생님
      
        this.items[0].isOpen = true;
        this.items[2].isOpen = true;

        this.items[1].isOpen = false;
        this.items[3].isOpen = false;
        this.items[4].isOpen = false;
        //this.items[5].isOpen = false;
      } else if(data === "학생") { //학생
         this.items[1].isOpen = true;
        this.items[2].isOpen = true;

        this.items[0].isOpen = false;
        this.items[3].isOpen = false;
        this.items[4].isOpen = false;
        //this.$session.set('position_cd',12345);
      }
    }
    
  },
  // updated() {
  //   if(this.isSignIn){
  //     this.items.splice(1,2);
  //     return;
  //   }
  // },
  updated(){
    if(this.isSignIn) {
      this.items[3].isOpen = this.isSignIn,
      this.items[4].isOpen = this.isSignIn
    }
  },
  
};
</script>
