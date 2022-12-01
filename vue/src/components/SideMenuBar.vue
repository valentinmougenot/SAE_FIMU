<template>
  <div class="sidebar">
    <v-list>
      <v-list-item>
        <v-list-item-content style="text-align: center">
          <v-list-item-title class="title">{{title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div class="nav-items pa-4">
        <v-list-item v-for="(d, i) in data" :key="i" class="item" :class="{selected: d.selected}" @click="$emit('select-item', i)">
          <v-list-item-content>
            <v-list-item-title class="title"><span class="item-text">{{d.text}}</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideMenuBar",
  props: {
    data: Array,
    title: String
  },
}
</script>

<style scoped>
@import '../../public/css/navbar.css';
</style>