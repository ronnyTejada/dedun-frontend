<template>
  <v-container>
    <v-card
      class="mx-auto"
      :color="$store.state.presupuestoSelected.color"
      dark
      max-width="800"
    >
      <v-card-title>
        <v-icon large left> mdi-piggy-bank</v-icon>
        <span class="title font-weight-light"
          >{{ $store.state.presupuestoSelected.name }}:
          {{ $store.state.presupuestoSelected.monto }}$</span
        >
      </v-card-title>
      <v-card-subtitle>
        <span class="title font-weight-light"
          ><v-icon large left> mdi-cash-multiple</v-icon>
          Ahorrado:
          {{ $store.state.presupuestoSelected.ahorrado }}$</span
        >
      </v-card-subtitle>

      <v-card-text
        class="headline font-weight-bold"
        style="display: flex; align-item: center; justify-content: center"
      >
        <v-progress-circular
          :rotate="360"
          :size="200"
          :width="15"
          :value="value"
          color="white"
        >
          {{ value }}%
        </v-progress-circular>
      </v-card-text>

      <v-card-actions>
        <v-list-item>
          <v-icon style="margin-right: 10px">mdi-calendar</v-icon>

          <v-list-item-content>
            <v-list-item-title
              >Fecha Limite:
              {{
                this.$store.state.presupuestoSelected.fechaLimite
              }}</v-list-item-title
            >
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-icon class="mr-1" @click="showAddMonto">
              mdi-plus-box-multiple</v-icon
            >

            <v-icon class="mr-1" @click="showInfo"> mdi-information </v-icon>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>

    <!--ADD MONTO  -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline primary" style="color: white">
          Agregar Dinero
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Cantidad"
            type="number"
            v-model="monto"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Close </v-btn>
          <v-btn color="primary" text @click="sendMonto">Agregar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--ADD MONTO END -->

    <!-- SHOW INFO --->
    <v-dialog v-model="dialogInfo" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Detalles de Ahorro
        </v-card-title>

        <v-card-text>
          <ul v-if="days === 0">
            <li>
              Para ahorrar
              {{ $store.state.presupuestoSelected.monto }}$ en
              {{ this.weeks }} semanas
            </li>
            <li>
              debes ahorrar
              {{ $store.state.presupuestoSelected.monto / this.weeks }}$ cada
              semana
            </li>
          </ul>
          <ul v-if="days > 0">
            <li>
              Para ahorrar
              {{ $store.state.presupuestoSelected.monto }}$ en
              {{ this.days }} dias
            </li>
            <li>
              debes ahorrar
              {{ $store.state.presupuestoSelected.monto / this.days }}$ cada dia
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--SHOW INFO END -->
  </v-container>
</template>


  
<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "Meta",
  data() {
    return {
      value: 0,
      dialog: false,
      dialogInfo: false,
      monto: 0,
      weeks: 0,
      days: 0,
    };
  },
  methods: {
    aumentarValue() {
      this.value += 5;
    },
    showAddMonto() {
      this.dialog = true;
    },
    showInfo() {
      this.dialogInfo = true;
    },
    sendMonto() {
      this.$store.state.presupuestoSelected.ahorrado += parseInt(this.monto);

      let multiplicacion = 100 * this.$store.state.presupuestoSelected.ahorrado;
      // let montoAux = this.$store.state.presupuestoSelected.monto - this.$store.state.presupuestoSelected.ahorrado
      this.value = parseInt(
        multiplicacion / this.$store.state.presupuestoSelected.monto
      );
      //this.$store.state.presupuestoSelected.ahorrado += parseInt(this.monto);
      if (this.value >= 100) {
        this.msgFelecitaciones();
      }

      this.dialog = false;
    },
    msgFelecitaciones() {
      Swal.fire({
        title: "Felicitaciones, has alcanzado tu meta",
        width: 600,
        padding: "3em",
        
        background: " url(https://cdn.pixabay.com/photo/2016/05/25/23/46/background-1416089_960_720.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
      });
    },
  },
  mounted() {
    let multiplicacion = 100 * this.$store.state.presupuestoSelected.ahorrado;
    this.value = parseInt(
      multiplicacion / this.$store.state.presupuestoSelected.monto
    );

    var fecha1 = moment().format("l");
    var fecha2 = moment(this.$store.state.presupuestoSelected.fechaLimite);

    this.weeks = fecha2.diff(fecha1, "weeks");
    if (this.weeks <= 1) {
      this.days = fecha2.diff(fecha1, "days");
    }
    console.log(this.weeks, "diferencias");
  },
};
</script>