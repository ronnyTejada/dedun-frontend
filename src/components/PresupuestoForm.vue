<template transition="scroll-x-transition">
  <v-container>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="$store.state.showNewPresupuesto"
      >
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Agregar Presupuesto</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titulo"
                      required
                      v-model="presupuestoName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Monto"
                      required
                      v-model="presupuesto"
                      :error-messages="presupuestoErrors"
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="newPresupuesto">Enviar</v-btn>

              <v-btn text @click="closeNewPresupuesto">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    
  </v-container>
</template>

<script>
const shortid = require('shortid');
import {ApiService} from '../api/index'

export default {
  name: "PresupuestoForm",
  props: {
    text: String,
    show: Boolean,
  },
  data() {
    return {
      presupuestoName: null,
      presupuesto: null,
      colors: [
        "blue-grey darken-2",
        "purple",
        "cyan darken-2",
        "blue darken-2",
        "pink",
      ],
      n: 0,
      numColumnas: 0,
      currentColum: null,
      columNames: [],
      columName: null,
      c: null,
    };
  },
  methods: {
    newPresupuesto() {
      if(this.presupuestoName.trim() === '' || this.presupuesto.trim() === ''){
        return;
      }
      let presupuesto = {
        id:shortid.generate(),
        name: this.presupuestoName,
        monto: this.presupuesto,
        color: this.colors[Math.floor(Math.random() * 4 + 0)],
        children: [],
        author:this.$store.state.user

      };
      this.$store.state.presupuestos.push(presupuesto);
      let aux = null;
      this.columNames.map((n, i) => {
        if (aux !== n) {
          this.$store.state.headers.push({ text: n, value: "val" + i });
        }
        aux = n;
      });
      this.$store.state.showNewPresupuesto=false
      ApiService.postPresupuesto(presupuesto).then((res)=>{
        presupuesto={}
        console.log(res)
      })
    },
    closeNewPresupuesto(){
      this.presupuesto=null
      this.presupuestoName=null
      this.$store.state.showNewPresupuesto=false
    }
  },

 
};
</script>