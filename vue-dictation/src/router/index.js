import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/',
    name: 'SignIn',
    component: () => import('../components/SignIn.vue')
  },
  {
    path: '/signin',
    name: 'signIn',
    component: () => import('../components/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/viewlc',
    name: 'viewlc',
    component: () => import('../components/Viewlc.vue')
  },
  {
    path: '/readlc',
    name: 'readlc',
    component: () => import('../components/Readlc.vue')
  },
  {
    path: '/studentlc',
    name: 'studentlc',
    component: () => import('../components/Studentlc.vue')
  },{
    path: '/write',
    name: 'write',
    component: () => import('../components/Teacher.vue')
  },{
    path: '/s_write',
    name: 'sWrite',
    component: () => import('../components/Student.vue')
  },{
    path: '/StudyWrite',
    name: 'stwr',
    component: () => import('../components/StudyWrite.vue')
  },{
    path: '/Teachermain',
    name: 'tmain',
    component: () => import('../components/Teachermain.vue')
  },{
    path: '/Admin',
    name: 'admin',
    component: () => import('../components/Admin.vue')
  },{
    path: '/Test',
    name: 'test',
    component: () => import('../components/Test.vue')


  },{
    path: '/crud',
    name: 'crud',
    component: () => import('../components/Crud.vue')
  },{
    path: '/crud2',
    name: 'crud2',
    component: () => import('../components/Crud2.vue')
  }
  


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
