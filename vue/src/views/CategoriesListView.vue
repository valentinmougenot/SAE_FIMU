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
          :to="'/categorie/add'"
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
        :fields="['libelle', 'couleur']"
        :titles="['Nom catégorie', 'Couleur', 'Actions']"
        :buttons="[{
          icon: 'mdi-pencil',
          color: 'primary'
        }, {
          icon: 'mdi-delete',
          color: 'error'
        }]"
        :pk="'id'"
        @button-click="buttonClick"
        ></TableList>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import {mapState} from "vuex";
export default {
  name: "CategoriesListView",
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  data: () => ({
    search: "",
  }),
  methods: {
    async deleteCategorie(id) {
      return await Vue.axios.delete("http://localhost:3000/categorie/" + id)
          .then(() => {
            this.$store.dispatch("getCategories");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer toutes les catégories ?")) {
        return await Vue.axios.delete("http://localhost:3000/categorie")
            .then(() => {
              this.$store.dispatch("getCategories");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push("/categorie/" + id + "/edit");
      } else if (buttonIndex === 1) {
        this.deleteCategorie(id);
      }
    }
  },
  computed: {
    ...mapState(["categories"]),
    filter() {
      return this.categories.filter(categorie => {
        return categorie.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    if (this.categories.length === 0) {
      this.$store.dispatch("getCategories");
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
@import '../../public/css/show.css';
</style>