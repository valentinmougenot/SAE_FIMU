<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          :to="'/genre/add'"
          color="success">Ajouter genre&emsp;<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="ma-6 addDeleteBtn"
          :height="56"
          color="error"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>

    <v-row class="table-center">
      <TableList
        :data="filter"
        :fields="['libelle']"
        :titles="['Nom genre', 'Actions']"
        :buttons="[
          {
            icon: 'mdi-pencil',
            color: 'primary'
          },
          {
            icon: 'mdi-delete',
            color: 'error'
          },
        ]"
        :pk="'id'"
        @button-click="buttonClick"
        ></TableList>
    </v-row>
  </v-container>
</template>

<script>
import {remove} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "GenresListView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    search: "",
  }),
  methods: {
    async deleteGenre(id) {
       await remove("genre/" + id)
          .then(() => {
            this.$store.dispatch("getGenres");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les genres ?")) {
         await remove("genre")
            .then(() => {
              this.$store.dispatch("getGenres");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push("/genre/" + id + "/edit");
      }
      else if (buttonIndex === 1) {
        this.deleteGenre(id);
      }
    }
  },
  computed: {
    ...mapState(["genres"]),
    filter() {
      return this.genres.filter(genre => {
        return genre.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    if (this.genres.length === 0) {
      this.$store.dispatch("getGenres");
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import '@/../public/css/show.css';
</style>