<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
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
      <v-col>
        <v-btn
            class="addDeleteBtn ma-6"
            color="success"
            :height="56"
            @click="$router.push('/notification/add')">Ajouter notification&emsp;<v-icon>mdi-plus-box-outline</v-icon>
        </v-btn>
        <v-btn
            class="addDeleteBtn ma-6"
            color="error"
            :height="56"
            @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <h1 class="display-1">Notifications</h1>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="notification in filtres" :key="notification.id">
              <v-list-item-content>
                <v-list-item-title>{{ notification.message }}</v-list-item-title>
                <v-list-item-subtitle>{{ notification.date_envoi }} - {{notification.heure_envoi}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="primary" @click="$router.push('/notification/' + notification.id + '/edit')"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn color="error" @click="deleteNotification(notification.id)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {remove} from "@/services/axios.service.js";
import { mapState } from "vuex";
export default {
  name: "NotificationsView",
  data: () => ({
    search: "",
  }),
  methods: {
    async deleteNotification(id) {
       await remove("notification/" + id)
          .then(() => {
            this.$store.dispatch("getNotifications");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer toutes les notifications ?")) {
         await remove('notification')
            .then(() => {
              this.$store.dispatch("getNotifications");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    }
  },
  computed: {
    ...mapState(["notifications"]),
    filtres() {
      return this.notifications.filter(notification => {
        return notification.message.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    if (this.$store.state.notifications.length === 0) {
      this.$store.dispatch("getNotifications");
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