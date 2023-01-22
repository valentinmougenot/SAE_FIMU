<template>
  <v-container class="form-center">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            <h1 class="display-1">Ajouter une notification</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="notification.message"
                label="Message de la notification"
                required
            ></v-text-field>
            <v-checkbox
                v-model="postponed"
                label="Planifier une date d'envoi">
            </v-checkbox>
            <v-text-field
                v-if="postponed"
                v-model="notification.heure_envoi"
                type="time"
                label="Heure d'envoi"
                required
            ></v-text-field>
            <v-text-field
                v-if="postponed"
                v-model="notification.date_envoi"
                type="date"
                label="Date d'envoi"
                required
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="addNotification">Ajouter</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {post} from "@/services/axios.service.js";
export default {
  name: "NotificationAddView",
  data: () => ({
    notification: {
      message: "",
      date_envoi: null,
      heure_envoi: null,
    },
    postponed: false,
  }),
  methods: {
    addNotification() {
      console.log(this.notification);
      if (!this.postponed) {
        this.notification.date_envoi = null;
        this.notification.heure_envoi = null;
      }
      post("notification", this.notification)
          .then(() => {
            this.$store.dispatch("getNotifications");
            this.$router.push("/notification");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
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