<template>
  <v-container>
    <v-col cols="12" sm="12" md="12">
      

      <v-row style="margin-top: 50px">
        <v-col cols="6">
          <v-card max-width="800" class="mx-auto" >
            <v-app-bar dark color="pink">
              <v-toolbar-title>Mis Presupuestos</v-toolbar-title><br />

              <v-spacer></v-spacer>
              <v-text-field
                label="Buscar"
                required
                style="width: 0px; margin-top: 20px"
                v-if="search"
              ></v-text-field>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon  @click="showNewPresupuestoF">
                <v-icon>mdi-plus-box-multiple-outline</v-icon>
              </v-btn>
            </v-app-bar>
            <v-container>
              <v-row dense>
                <v-col
                  cols="12"
                  v-if="$store.state.presupuestos.length === 0"
                  style="text-align: center"
                >
                  <h5>Agregar Presupuestos</h5>
                  <v-btn icon @click="showNewPresupuestoF"
                    ><v-icon icon style="font-size: 40px"
                      >mdi-plus-box-multiple</v-icon
                    ></v-btn
                  >
                </v-col>
                <v-col
                  cols="12"
                  v-for="item in $store.state.presupuestos"
                  :key="item.name"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :color="item.color"
                      dark
                      max-height="80px"
                      :elevation="hover ? 24 : 2"
                      @click="goToPresupuesto(item)"
                    >
                      <v-card-title class="headline">
                        {{ item.name }}
                      </v-card-title>

                      <v-card-subtitle>{{ item.monto }}$</v-card-subtitle>

                      
                    </v-card>
                  </v-hover>
                </v-col>

                
              </v-row>
            </v-container>

           
          </v-card>
        </v-col>

        <!--METAS DE AHORROS-->
        <v-col cols="6">
          <v-card max-width="800" >
            <v-app-bar dark color="purple">
              <v-toolbar-title>Metas de Ahorro</v-toolbar-title><br />

              <v-spacer></v-spacer>
              <v-text-field
                label="Buscar"
                required
                style="width: 0px; margin-top: 20px"
                v-if="search"
              ></v-text-field>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon @click="showNewMetaF">
                <v-icon>mdi-plus-box-multiple-outline</v-icon>
              </v-btn>
            </v-app-bar>
            <v-container>
              <v-row dense>
                <v-col
                  cols="12"
                  v-if="$store.state.metas.length === 0"
                  style="text-align: center"
                >
                  <h5>Agregar Metas</h5>
                  <v-btn icon @click="showNewMetaF"
                    ><v-icon icon style="font-size: 40px"
                      >mdi-plus-box-multiple</v-icon
                    ></v-btn
                  >
                </v-col>
                <v-col
                  cols="12"
                  v-for="item in $store.state.metas"
                  :key="item.name"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :color="item.color"
                      dark
                      max-height="80px"
                      :elevation="hover ? 24 : 2"
                      @click="goToMeta(item)"
                    >
                      <v-card-title class="headline">
                        {{ item.name }}
                      </v-card-title>

                      <v-card-subtitle>{{ item.monto }}$</v-card-subtitle>

                      
                    </v-card>
                  </v-hover>
                </v-col>

                
              </v-row>
            </v-container>

           
          </v-card>
        </v-col>

        
      </v-row>
    </v-col>
    <presupuesto-form />
    <metas-form/>
  </v-container>
</template>
<style >
.moduleCard {
  width: 3000px;
  margin-top: 50%;
}
</style>
<script>

import PresupuestoForm from './PresupuestoForm.vue';
import MetasForm from './MetasForm.vue';
import {ApiService} from '../api/index'
export default {
  name: "DashBoard",
  components:{
        'presupuesto-form':PresupuestoForm,
        'metas-form':MetasForm 
         
         },
  data (){
    return{
      showNewPresupuesto:false
    }
  },
  methods: {
    goToPresupuesto(item) {
      this.$store.state.presupuestoSelected = item;
      this.$router.push("/presupuesto");
    },
     goToMeta(item) {
      this.$store.state.presupuestoSelected = item;
      this.$router.push("/meta");
    },
    showNewPresupuestoF(){
      this.$store.state.showNewPresupuesto=true
  
    },
    showNewMetaF(){
      this.$store.state.showNewMeta=true
  
    }
  },
  mounted() {
    console.log(this.$store.state.presupuestos);
    ApiService.getAllPresupuestos().then((res)=>{
      console.log(res.data)
      
      this.$store.commit('setPresupuestos',res.data)
    }).catch(err=>{
      console.log(err)
    })
    
  },
};
</script>
