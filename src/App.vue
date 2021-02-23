<template>
  <v-app>
    <v-main>
      <v-app-bar color="white">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        
        <router-link  to="/"><v-toolbar-title>Dedun</v-toolbar-title></router-link>
        <v-spacer></v-spacer>

        <v-btn icon>
          <router-link to="/presupuestoForm"
            ><v-icon>mdi-heart</v-icon></router-link
          >
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      

      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>

    </v-main>

     
  </v-app>
</template>

<script>
//import Dashboard from "./components/Dashboard";

export default {
  name: "App",

  components: {
   // Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
