<template>
  <nav>
    <div class="topbar">
      <div class="d-inline-flex">
      <v-menu
          down
          :offset-y="true"
          class="ma-1"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="transparent"
              dark
              v-bind="attrs"
              v-on="on"
          >
            <v-icon color="black">mdi-account-circle</v-icon>&emsp;{{user.identifiant}}&emsp;<v-icon color="black">mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="$emit('user-btn-click', index)"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
          color="red"
          dark
          style="display: inline-block"
          class="ma-1"
          @click="$emit('switch-saison')"
      >{{btnChange}}</v-btn>
      <v-select
          v-model="defaultSelect"
          :items="saisonSelect"
          label="Saison"
          outlined
          dense
          hide-details
          background-color="green"
          class="select ma-1"
          style="width: 15%"
          @change="$emit('change-saison', defaultSelect)"
          ></v-select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopMenuBar",
  data: () => ({
    defaultSelect: null
  }),
  props: {
    user: Object,
    items: Array,
    btnChange: String,
    saisonSelect: Array,
  },
  methods: {
    test() {
      console.log("salut");
    }
  },
  created() {
    this.defaultSelect = this.saisonSelect[0];
  }
}
</script>

<style scoped>
@import '@/../public/css/navbar.css';
</style>