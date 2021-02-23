<template>
  <v-container>
    <v-col>
      <v-card max-width="800" class="mx-auto" style="margin-top: 50px">
        <v-app-bar dark :color="$store.state.presupuestoSelected.color">
          <v-toolbar-title
            >{{ $store.state.presupuestoSelected.name }}:
            {{ $store.state.presupuestoSelected.monto }}$</v-toolbar-title
          ><br />
          <v-card-subtitle
            style="position: absolute; top: 40%; left: -1px; color: white"
            >Restante: {{ total }}$</v-card-subtitle
          >
          <v-spacer></v-spacer>
          <v-text-field
            label="Buscar"
            required
            v-model="searchWord"
            style="width: 0px; margin-top: 20px"
            v-if="search"
          ></v-text-field>
          <v-btn icon>
            <v-icon @click="searchF">mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon @click="showNewEgreso">
            <v-icon>mdi-plus-box-multiple-outline</v-icon>
          </v-btn>
        </v-app-bar>

        <v-container>
          <v-row dense>
            <v-col
              cols="12"
              v-if="$store.state.presupuestoSelected.children.length === 0"
              style="text-align: center"
            >
              <h5>no hay egresos</h5>
              <v-btn icon @click="showNewEgreso"
                ><v-icon icon style="font-size: 40px"
                  >mdi-plus-box-multiple</v-icon
                ></v-btn
              >
            </v-col>
            <v-col
              cols="12"
              v-for="item in $store.state.presupuestoSelected.children"
              :key="item.name"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :color="item.color"
                  dark
                  max-height="80px"
                  :elevation="hover ? 24 : 2"
                >
                  <v-card-title class="headline">
                    {{ item.name }}: {{ item.monto }}$
                  </v-card-title>

                  <v-card-subtitle v-if="item.children.length > 0"
                    >{{ item.restante }}$</v-card-subtitle
                  >

                  <v-card-actions>
                    <v-btn icon absolute right top @click="showEditEgreso(item)"
                      ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      absolute
                      right
                      top
                      style="margin-right: 30px"
                      @click="deleteItem(item)"
                      ><v-icon icon>mdi-delete-empty</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      absolute
                      right
                      top
                      style="margin-right: 60px"
                      @click="showNewEgresoToItem(item)"
                      ><v-icon icon>mdi-plus-box-multiple</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      absolute
                      right
                      top
                      style="margin-right: 90px"
                      v-if="item.children.length > 0"
                      @click="showInfo(item)"
                      ><v-icon icon>mdi-eye</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

    <!--ADD NUEVO ITEM -->
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialogNew"
      >
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Nuevo Egreso</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titulo"
                      required
                      v-model="egresoName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Monto"
                      hint="example of helper text only on focus"
                      required
                      v-model="egresoMonto"
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="sendNewEgreso">Enviar</v-btn>

              <v-btn text @click="dialogNew = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <!--ADD NUEVO ITEM END-->

    <!-- EDIT ITEM-->
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialogEdit"
      >
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Editar Item</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titulo"
                      required
                      v-model="egresoName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Monto"
                      hint="example of helper text only on focus"
                      required
                      v-model="egresoMonto"
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="sendEgresoEdited">Enviar</v-btn>

              <v-btn text @click="closeEditEgreso">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>

    <!-- EDIT ITEM FIN-->

    <!-- SHOW INFO -->
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialogInfo"
      >
        <template>
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Titulo</th>
                    <th class="text-left">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in itemSelected.children" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.monto }}$</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialogInfo = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>

    <!-- SHOW INFO END -->
    <!-- NEW EGRESO FOR ITEM SELECTED -->
    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialogNewToItem"
      >
        <template>
          <v-card>
            <v-toolbar color="primary" dark v-if="itemSelected !== null"
              >Nuevo Egreso Para: {{ itemSelected.name }}</v-toolbar
            >
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titulo"
                      required
                      v-model="egresoName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Monto"
                      required
                      v-model="egresoMonto"
                      :error-messages="errorMonto"
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="sendNewEgresoToItem">Enviar</v-btn>

              <v-btn text @click="closeNewEgresoToItem">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <!-- NEW EGRESO FOR ITEM SELECTED END -->
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
const shortid = require("shortid");
import { ApiService } from "../api/index";

export default {
  name: "Presupuesto",

  data: () => ({
    dialogNew: false,
    dialogDelete: false,
    dialogInfo: false,
    dialogNewToItem: false,
    egresoName: null,
    egresoMonto: null,
    egresos: [],
    search: false,
    searchWord: null,
    total: 0,
    dialogEdit: false,
    itemSelected: null,
    errorMonto: null,
    colors: [
      "blue-grey darken-2",
      "purple",
      "cyan darken-2",
      "blue darken-2",
      "pink",
      "pink lighten-5",
    ],
  }),
  methods: {
    showNewEgreso() {
      this.dialogNew = true;
    },
    showNewEgresoToItem(item) {
      this.dialogNewToItem = true;
      this.itemSelected = item;
    },
    showEditEgreso(item) {
      this.dialogEdit = true;
      this.egresoName = item.name;
      this.egresoMonto = item.monto;
      this.itemSelected = item;
    },
    showInfo(item) {
      this.dialogInfo = true;
      this.itemSelected = item;
    },
    closeEditEgreso() {
      this.dialogEdit = false;
      this.egresoName = null;
      this.egresoMonto = null;
      this.itemSelected = null;
    },

    sendNewEgreso() {
      this.total -= this.egresoMonto;
      let egreso = {
        id: shortid.generate(),
        name: this.egresoName,
        monto: parseFloat(this.egresoMonto).toFixed(2),
        color: this.colors[Math.floor(Math.random() * 4 + 0)],
        restante: parseFloat(this.egresoMonto).toFixed(2),
        children: [],
      };
      this.$store.state.presupuestoSelected.children.push(egreso);

      ApiService.postEgreso(
        this.$store.state.presupuestoSelected.id,
        egreso
      ).then((res) => {
        egreso = {};
        console.log(res);
      });
      console.log(this.egresos);
      this.egresoName = null;
      this.egresoMonto = null;
      this.dialogNew = false;
    },

    closeNewEgresoToItem() {
      this.egresoMonto = null;
      this.egresoName = null;
      this.dialogNewToItem = false;
    },

    sendNewEgresoToItem() {
      console.log(parseFloat(this.itemSelected.restante).toFixed(2) < parseFloat(this.egresoMonto).toFixed(2))
            console.log(this.itemSelected.restante , this.egresoMonto)

      if (parseInt(this.itemSelected.restante) < parseInt(this.egresoMonto)) {
        this.errorMonto = "No hay suficientes fondos";

        return;
      }

      let egreso = {
        name: this.egresoName,
        monto:parseFloat( this.egresoMonto).toFixed(2),
      };
      this.itemSelected.children.push(egreso);
      this.itemSelected.restante -= parseFloat( this.egresoMonto).toFixed(2);
      console.log(this.egresos);

      ApiService.updateEgreso(
        this.$store.state.presupuestoSelected.id,
        this.itemSelected
      ).then((res) => {
        egreso = {};
        console.log(res);
      });
      this.egresoName = null;
      this.egresoMonto = null;
      this.dialogNewToItem = false;
    },

    sendEgresoEdited() {
      this.itemSelected.monto = this.egresoMonto;
      this.itemSelected.name = this.egresoName;
      this.total = this.$store.state.presupuestoSelected.monto;

      this.$store.state.presupuestoSelected.children.map((child) => {
        this.total -= child.monto;
      });
      ApiService.editEgreso(
        this.$store.state.presupuestoSelected.id,
        this.itemSelected
      ).then((res) => {
        
        console.log(res);
      });
      this.dialogEdit = false;
    },

    searchF() {
      this.search = !this.search;
    },

    deleteItem(item) {
      console.log(item);
      Swal.fire({
        title: `Eliminar ${item.name} del presupuesto?`,
        icon: "warning",

        showCancelButton: true,
        confirmButtonText: `Eliminar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.total += parseInt(item.monto);
          this.$store.state.presupuestoSelected.children = this.$store.state.presupuestoSelected.children.filter(
            (child) => child.id !== item.id
          );
          ApiService.deleteEgreso(
            this.$store.state.presupuestoSelected.id,
            item.id
          ).then((res) => {
            this.itemSelected=null
            console.log(res);
          });
          Swal.fire("Eliminado exitosamente!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
  mounted() {
    if (this.$store.state.presupuestoSelected.children.length === 0) {
      this.total = this.$store.state.presupuestoSelected.monto;
    } else {
      this.total = this.$store.state.presupuestoSelected.monto;

      this.$store.state.presupuestoSelected.children.map((child) => {
        this.total -= child.monto;
      });
    }
  },
};
</script>