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
              <v-btn color="blue darken-1" text @click="editNotification">Modiifer</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {get, put} from "@/services/axios.service.js";
export default {
  name: "NotificationEditView",
  data: () => ({
    notification: {
      message: "",
      date_envoi: null,
      heure_envoi: null,
    },
    postponed: false,
  }),
  methods: {
    async getNotification() {
      await get("notification/" + this.$route.params.id)
        .then((response) => {
          this.notification.message = response.data.message;
          this.notification.date_envoi = response.data.date_envoi;
          this.notification.heure_envoi = response.data.heure_envoi;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async editNotification() {
      if (!this.postponed) {
        this.notification.date_envoi = null;
        this.notification.heure_envoi = null;
      }
      put("notification/" + this.$route.params.id, this.notification)
        .then(() => {
          this.$store.dispatch("getNotifications");
          this.$router.push("/notification");
        })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
  },
  mounted() {
    this.getNotification();
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