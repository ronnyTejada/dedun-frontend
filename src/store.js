import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        presupuestos:[],
        headers:[],
        presupuestoSelected:null,
        metas:[],
        showNewPresupuesto:false,
        showNewMeta:false,
        n:50

    },
    getters:{},
    mutations:{
        setPresupuestos(state, presupuestos){
            presupuestos.map(p=>{
                let presupuesto = state.presupuestos.filter(item=>item.id === p.id)
                if(presupuesto.length === 0){
                    state.presupuestos.push(p)
                }
            
            })
        }
    }

})