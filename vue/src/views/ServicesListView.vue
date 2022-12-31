<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="search"
            class="ma-4"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="addDeleteBtn ma-6"
          color="success"
          :height="56"
          @click="$router.push('/service/add')">Ajouter service&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="addDeleteBtn ma-6"
          color="error"
          :height="56"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-row class="table-center">
      <TableList
          :data="filtres"
          :fields="['libelle']"
          :titles="['Nom service', 'Actions']"
          :buttons="[
          {
            icon: 'mdi-pencil',
            color: 'primary'
          },
          {
            icon: 'mdi-delete',
            color: 'error'
          }
        ]"
          :pk="'id'"
          @button-click="buttonClick"
      ></TableList>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import {mapState} from "vuex";
export default {
  name: "ServicesListView",
  data: () => ({
    search: "",
  }),
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  methods: {
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push(`/service/${id}/edit`);
      } else if (buttonIndex === 1) {
        this.deleteService(id);
      }
    },
    deleteService(id) {
      Vue.axios.delete(`http://localhost:3000/service/${id}`)
          .then(() => {
            this.$store.dispatch("getServices");
          })
          .catch((error) => {
            console.log(error);
          });
    },
    deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les services ?")) {
        Vue.axios.delete(`http://localhost:3000/service`)
            .then(() => {
              this.$store.dispatch("getServices");
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
  },
  computed: {
    ...mapState(["services"]),
    filtres() {
      return this.services.filter(service => {
        return service.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    if (this.services.length === 0) {
      this.$store.dispatch("getServices");
    }
  }
}
</script>

<style scoped>

</style>