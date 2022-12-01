<template>
  <nav>
    <div class="topbar">
      <v-menu
          down
          :offset-y="true"
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
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopMenuBar",
  props: {
    user: Object,
    items: Array
  },
}
</script>

<style scoped>
@import '../../public/css/navbar.css';
</style>