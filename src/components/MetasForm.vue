<template transition="scroll-x-transition">
  <v-container>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="$store.state.showNewMeta"
      >
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Agregar Meta</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titulo"
                      required
                      v-model="metaName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Monto"
                      required
                      v-model="metaMonto"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-menu
                      ref="menuEndDate"
                      v-model="menuEndDate"
                      :close-on-content-click="false"
                      :return-value.sync="endDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endDate"
                          label="Fecha Final"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menuEndDate = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menuEndDate.save(endDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="newMeta">Enviar</v-btn>

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

export default {
  name: "MetasForm",
  props: {
    text: String,
    show: Boolean,
  },
  data() {
    return {
      metaName: null,
      menuEndDate:false,
      endDate:null,
      metaMonto: null,
      colors: [
        "blue-grey darken-2",
        "purple",
        "cyan darken-2",
        "blue darken-2",
        "pink",
      ],
    };
  },
  methods: {
    newMeta() {
      if (this.metaName.trim() === "" || this.metaMonto.trim() === "") {
        return;
      }
      let meta = {
        id:shortid.generate(),
        name: this.metaName,
        monto: this.metaMonto,
        color: this.colors[Math.floor(Math.random() * 4 + 0)],
        fechaLimite:this.endDate,
        ahorrado: 0,
      };
      this.$store.state.metas.push(meta);
        this.$store.state.showNewMeta=false

      
      /*this.columNames.map((n, i) => {
        if (aux !== n) {
          this.$store.state.headers.push({ text: n, value: "val" + i });
        }
        aux = n;
      });*/
    },
    closeNewPresupuesto() {
      this.meta = null;
      this.metaName = null;
      this.$store.state.showNewMeta = false;
      this.menuEndDate=false
    },
  },
};
</script>