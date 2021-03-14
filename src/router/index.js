import Vue from 'vue';
import VueRouter from "vue-router";
import PresupuestoForm from "../components/PresupuestoForm.vue"
import Dashboard from "../components/Dashboard.vue"
import Presupuesto from "../components/Presupuesto.vue"
import Meta from "../components/Meta.vue"
import RegistrarUser from "../components/Registrar.vue"
import LoginUser from "../components/Login.vue"
import store from "../store";

Vue.use(VueRouter)

const routes = [

    {
      path:'/',
      name:'dashboard',
      component:Dashboard,
      meta:{
        auth:true
      }
    },
    {
      path:'/presupuestoForm',
      name:'presupuestoForm',
      component:PresupuestoForm,
      meta:{
        auth:true
      }
    },
    {
      path:'/presupuesto/:id',
      name:'presupuesto',
      component:Presupuesto,
      meta:{
        auth:true
      }
    },
    {
      path:'/meta/:id',
      name:'meta',
      component:Meta,
      meta:{
        auth:true
      }
    },
    {
      path:'/registrar',
      name:'registrar',
      component:RegistrarUser
    },
    {
      path:'/login',
      name:'login',
      component:LoginUser
    }

    
]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next)=>{
  let userlogged = store.getters.isUserLogged
  let auth = to.matched.some(record => record.meta.auth)
  console.log(userlogged)
  if(auth && !userlogged){
    next('/login')
  }else if(!auth && userlogged){
    next('/')
  }else{
    next()
  }
  
})

export default router;
