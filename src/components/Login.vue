<template>
  <div id="de">
    <v-container class="form-container elevation-7">
      <form style="margin-bottom: 10px">
        <v-text-field
          v-model="email"
          label="Email"
          prepend-icon="mdi-account"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="password"
          type="password"
          prepend-icon="mdi-lock"
        ></v-text-field>

        <v-btn
          class="mr-4"
          style="width: 100%"
          v-if="!this.loading"
          color="primary"
          :disabled="this.email.length === 0 && this.password.length === 0"
          @click="sendAuth"
        >
          Enviar
        </v-btn>
        <v-btn
          class="mr-4"
          style="width: 100%"
          v-if="this.loading"
          color="primary"
          @click="&quot;&quot;;"
        >
          Loading...
        </v-btn>
      </form>
      <router-link to="/registrar">Crear Cuenta</router-link>
    </v-container>

    <div id="links">
      <a href="https://github.com/ronnyTejada/dedun-frontend" target="_blank">código frontend</a>
      <a href="https://github.com/ronnyTejada/dedun-backend" target="_blank">código backend</a>
    </div>
  </div>
</template>
<style scoped>
#de {
  background-color: #f3f3f4;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
}
.form-container {
  max-width: 400px;
  text-align: center;
  border-radius: 10px;
  background-color: #ffff;
}

#links{
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  margin-top: 20px;
}
</style>

<script>
import Cookies from "js-cookie";
import { ApiService } from "../api/index";

export default {
  name: "LoginUser",
  data: () => {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    sendAuth() {
      this.loading = true;
      ApiService.loginUser(this.email, this.password).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$store.commit("setUser", res.data.token);
          this.$router.replace("/");
          Cookies.set("token", res.data.token);

          return;
        }

        this.loading = false;
        alert(res.data.msj);
      });
    },
  },
};
</script>
