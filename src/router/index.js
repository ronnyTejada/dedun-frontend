import Vue from 'vue';
import VueRouter from "vue-router";
import PresupuestoForm from "../components/PresupuestoForm.vue"
import Dashboard from "../components/Dashboard.vue"
import Presupuesto from "../components/Presupuesto.vue"
import Meta from "../components/Meta.vue"

Vue.use(VueRouter)

const routes = [

    {
      path:'/',
      name:'dashboard',
      component:Dashboard
    },
    {
      path:'/presupuestoForm',
      name:'presupuestoForm',
      component:PresupuestoForm
    },
    {
      path:'/presupuesto',
      name:'presupuesto',
      component:Presupuesto
    },
    {
      path:'/meta',
      name:'meta',
      component:Meta
    }

    
]

const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

export default router;
