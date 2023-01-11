<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Ajouter un stand</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                    v-model="stand.libelle"
                    label="Nom du stand"
                    required
                ></v-text-field>
                <v-select
                    v-model="stand.id_typestand"
                    :items="typestandSelect"
                    label="Type de stand"
                    required
                ></v-select>
                <v-text-field
                    v-model="stand.latitude"
                    label="Latitude"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="stand.longitude"
                    label="Longitude"
                    required
                ></v-text-field>
                <v-select
                    v-model="id_services"
                    :items="serviceSelect"
                    label="Services du stand"
                    multiple
                    chips
                    required
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index <= 1">
                      <span>{{ item.text }}</span>
                    </v-chip>
                    <span
                        v-if="index === 2"
                        class="grey--text text-caption"
                    >
                (+{{ id_services.length - 2 }} autre<span v-if="id_services.length - 2 > 1">s</span>)
                    </span>
                  </template>
                </v-select>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="addStand">Ajouter</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue'
import {mapState} from "vuex";

export default {
  name: "StandAddView",
  data() {
    return {
      stand: {
        libelle: "",
        id_typestand: "",
        latitude: "",
        longitude: "",
      },
      id_services: [],
    };
  },
  methods: {
    addStand() {
      this.stand.latitude = parseFloat(this.stand.latitude);
      this.stand.longitude = parseFloat(this.stand.longitude);
      Vue.axios.post('http://localhost:3000/stand', this.stand)
          .then(response => {
            this.id_services.forEach(id_service => {
              Vue.axios.post('http://localhost:3000/propose', {
                id_stand: response.data.id,
                id_service: id_service
              })
            })
            this.$store.dispatch('getStands');
            this.$router.push('/stand');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },
  computed: {
    ...mapState(['typestands', 'services']),
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
    }
  },
  mounted() {
    if (this.typestands.length === 0) {
      this.$store.dispatch('getTypestands');
    }
    if (this.services.length === 0) {
      this.$store.dispatch('getServices');
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