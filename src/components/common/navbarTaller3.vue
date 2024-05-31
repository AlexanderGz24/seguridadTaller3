<template>
  <v-app-bar color="rgba(255,255,255,255)" density="compact">
    <v-img src="/public/img/AIRG-LOGO.jpg"></v-img>
    <v-img src="/public/img/logo-uni.JPG"></v-img>
  </v-app-bar>

  <v-navigation-drawer expand-on-hover rail style="border-color: rgba(0,0,0,255); border-width: 1.5px;height: 100%; ">

    <h3>{{ usuario }}</h3>


    <hr>
    <br>
    <div align="center">
      <v-img src="/public/img/seguridad-portada.JPG" style="width: 80%; border-radius: 10px;"></v-img>
    </div>


    <v-list density="compact" nav>
      <!-- <v-list-item prepend-icon="mdi-repeat" title="Maestro Add clientes" to="/AddCorreosClientes"></v-list-item> -->
      <v-list-item title="Integrantes:"></v-list-item>
      <v-list-item title="Rojas Requena Deyran"></v-list-item>
      <v-list-item title="Villazón Sanchez Victor Alexander"></v-list-item>
    </v-list>

  </v-navigation-drawer>



</template>

<script>

export default {
  data() {
    return {
      //drawer: true,
      usuario: 'Grupo 4',
    };
  },

  mounted() {

  },
  methods: {


  }

}

</script>