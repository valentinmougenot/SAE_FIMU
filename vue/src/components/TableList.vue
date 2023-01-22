<template>
  <table class="listing">
    <thead>
    <tr>
      <th v-for="(title, index) in titles" :key="index">{{title}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(d, index) in data" :key="index">
      <td v-for="(field, i) in fields" :key="i">{{d[field]}}</td>
      <td>
        <v-btn class="ma-1" v-for="(btn, i) in buttons" :color="btn.color" :key="i" @click="$emit('button-click', d[pk], i)"><v-icon>{{btn.icon}}</v-icon></v-btn>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableList",
  props: {
    data: Array,
    fields: Array,
    titles: Array,
    buttons: Array,
    pk: String,
  }
}
</script>

<style scoped>
@import '@/../public/css/show.css';
</style>