import Vue from "vue";
import Cookies from 'js-cookie'

import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        presupuestos:[],
        headers:[],
        itemSelected:null,
        metas:[],
        showNewPresupuesto:false,
        showNewMeta:false,
        n:50,
        user:Cookies.get('token')

    },
    getters:{
        isUserLogged(state){
            if(state.user){
                return state.user
            }else{
                return null
            }
        }
    },
    mutations:{
        setUser(state,token){
            state.user=token
            console.log(state.user)


        },
        setPresupuestos(state, presupuestos){
            presupuestos.map(p=>{
                let presupuesto = state.presupuestos.filter(item=>item.id === p.id)
                if(presupuesto.length === 0){
                    state.presupuestos.push(p)
                }
            
            })
        },
        setAhorros(state, ahorros){
            ahorros.map(a=>{
                let ahorros = state.metas.filter(item=>item.id === a.id)
                if(ahorros.length === 0){
                    state.metas.push(a)
                }
            
            })
        }
    }

})