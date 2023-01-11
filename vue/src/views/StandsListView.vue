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
      <v-col cols="12" sm="4" md="4">
        <v-select
            v-model="typestand"
            class="ma-4"
            :items="typestandSelect"
            :height="56"
            chips
            label="Type de stand"
            multiple
            outlined>
        </v-select>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-select
            v-model="service"
            class="ma-4"
            :items="serviceSelect"
            :height="56"
            chips
            label="Services"
            multiple
            outlined>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="addDeleteBtn ma-6"
          color="success"
          :height="56"
          @click="$router.push('/stand/add')">Ajouter stand&emsp;<v-icon>mdi-plus-box-outline</v-icon>
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
          :fields="['libelle', 'tsl', 'latitude', 'longitude', 'tsr']"
          :titles="['Nom stand', 'Type de stand', 'Latitude', 'Longitude', 'Services', 'Actions']"
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
import {mapState} from "vuex";
import Vue from "vue";

export default {
  name: "StandsListView",
  data() {
    return {
      search: "",
      typestand: [],
      service: [],
    };
  },
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  methods: {
    standFiltres() {
      return this.stands.filter(stand => {
        return stand.libelle.toLowerCase().includes(this.search.toLowerCase());
      })
    },
    typestandsFiltres() {
      if (this.typestand.length === 0) {
        return this.stands;
      }
      return this.stands.filter(stand => {
        return this.typestand.includes(stand.id_typestand);
      })
    },
    servicesFiltres() {
      if (this.service.length === 0) {
        return this.stands;
      }
      let add = false;
      let result = [];
      this.stands.forEach(stand => {
        add = false;
        stand.services.forEach(service => {
          if (!add && this.service.includes(service.id)) {
            add = true;
            result.push(stand);
          }
      });});
      return result;
    },
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push(`/stand/${id}/edit`);
      } else if (buttonIndex === 1) {
        this.deleteStand(id);
      }
    },
    deleteStand(id) {
      Vue.axios.delete('http://localhost:3000/stand/' + id)
          .then(() => {
            this.$store.dispatch('getStands');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les stands ?")) {
        Vue.axios.delete('http://localhost:3000/stand')
            .then(() => {
              this.$store.dispatch('getStands');
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
  },
  computed: {
    ...mapState(["stands", "typestands", "services"]),
    filtres() {
      return this.standFiltres().filter(stand => {
        return this.typestandsFiltres().includes(stand);
      }).filter(stand => {
        return this.servicesFiltres().includes(stand);
      });
    },
    typestandSelect() {
      return this.typestands.map(typestand => {
        return {
          text: typestand.libelle,
          value: typestand.id
        }
      })
    },
    serviceSelect() {
      return this.services.map(service => {
        return {
          text: service.libelle,
          value: service.id
        }
      })
    },
  },
  mounted() {
    if (this.stands.length === 0) {
      this.$store.dispatch("getStands");
    }
    if (this.typestand.length === 0) {
      this.$store.dispatch("getTypestands");
    }
    if (this.services.length === 0) {
      this.$store.dispatch("getServices");
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

</style>