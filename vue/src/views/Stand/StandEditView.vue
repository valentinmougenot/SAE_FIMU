<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Modifier un stand</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                    v-model="stand.libelle"
                    label="Nom du stand"
                    required
                ></v-text-field>
                <v-select
                    v-model="stand.typestandId"
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
                  <v-btn color="blue darken-1" text @click="editStand">Modifier</v-btn>
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
import {mapState} from "vuex";
import {get, post, put, remove} from "@/services/axios.service.js";
export default {
  name: "StandEditView",
  data() {
    return {
      stand: {
        libelle: "",
        typestandId: "",
        latitude: "",
        longitude: "",
      },
      id_services: [],
    };
  },
  methods: {
    async getStand() {
      await get("stand/" + this.$route.params.id, {headers: {'saison': this.$store.state.saisonSelected}})
        .then((response) => {
          this.stand = response.data.data;
          this.id_services = response.data.data.services.map((service) => service.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editStand() {
      this.stand.latitude = parseFloat(this.stand.latitude);
      this.stand.longitude = parseFloat(this.stand.longitude);
      this.stand.services = this.id_services;
      await put(`/stand`, this.stand, {headers: {'saison': this.$store.state.saisonSelected}})
          .then(async () => {
            await this.$store.dispatch('getStands');
            await this.$router.push('/stand');
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
  async created() {
    if (this.typestands.length === 0) {
      await this.$store.dispatch('getTypestands');
    }
    if (this.services.length === 0) {
      await this.$store.dispatch('getServices');
    }
    this.getStand();
  },

}
</script>

<style scoped>

</style>