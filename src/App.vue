<template>
  <v-app>
    <v-main>
      <v-app-bar color="white">
        
        
        <router-link  to="/" style="text-decoration:none; color:purple"><v-toolbar-title>Dedun</v-toolbar-title></router-link>
        <v-spacer></v-spacer>

      
        <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>

              </v-btn>
            </template>
            <v-list>
              <v-list-item link to="/" v-if="this.$store.getters.isUserLogged">
                <v-list-item-title icon>Inicio</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                v-if="this.$store.getters.isUserLogged"
                @click="goToChangePassword()"
              >
                <v-list-item-title icon>Cambiar Contraseña</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                v-if="this.$store.getters.isUserLogged"
                @click="logout()"
              >
                <v-list-item-title>Cerrar Sesión</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="!this.$store.getters.isUserLogged"
                link
                to="/login"
              >
                <v-list-item-title>Iniciar Sesión</v-list-item-title>
              </v-list-item>
               <v-list-item
                v-if="!this.$store.getters.isUserLogged"
                link
                to="/registrar"
              >
                <v-list-item-title>Crear Cuenta</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      </v-app-bar>
      

      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>

    </v-main>

     
  </v-app>
</template>

<script>
//import Dashboard from "./components/Dashboard";
import Cookies from 'js-cookie'

export default {
  name: "App",

  components: {
   // Dashboard,
  },

  data: () => ({
    //
  }),
  methods:{
    logout(){
      Cookies.remove('token')
      this.$store.commit('setUser',null)
      this.$store.state.presupuestos=[]
      this.$store.state.ahorros=[]


      this.$router.replace('/login')

    }
  }
};
</script>
