<template>
  <div class="container">
    <header class="jumbotron">
      <b-jumbotron text-variant="dark" :header="currentUser.username">
        <p>Profile</p>
      </b-jumbotron>

    </header>
    <div class="info">
      <p>
        <strong>Token:</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ... {{
          currentUser.accessToken.substr(currentUser.accessToken.length -
            20) }}
      </p>
      <p>
        <strong>Id:</strong>
        {{ currentUser.id }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.email }}
      </p>
      <p>
        <strong>Bio:</strong>
        {{ currentUser.bio }}
      </p>
      <p>
        <strong>Website:</strong>
        {{ currentUser.website }}
      </p>
      <p>
        <strong>Twitter:</strong>
        {{ currentUser.twitter }}
      </p>
      <p>
        <strong>Address:</strong>
        {{ currentUser.address }}
      </p>
      <p>
        <strong>Verified:</strong>
        {{ currentUser.verified }}
      </p>
      <p>
        <strong>Whitelisted:</strong>
        {{ currentUser.whitelisted }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="(role, index) in currentUser.role" :key="index">{{ role }}</li>
      </ul>
    </div>
    <b-row>
      <b-col cols="6">


        <b-button-group>
          <b-button variant="palette11" :to="'/editprofile'">Edit profile</b-button>
          <b-button v-if="!currentUser.verified" @click="sendVerifyMail" variant="palette12">Confirm email</b-button>
        </b-button-group>
      </b-col>
      <b-col cols="6">
        <DeleteUser @deleteUser="deleteUser"></DeleteUser>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import DeleteUser from '../components/DeleteUser.vue';

export default {
  name: 'Profile',
  components: {
    DeleteUser
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    deleteUser: function () {
      this.$store.dispatch('auth/deleteUser');
      this.$router.push('/');
    }
  }
};
</script>
<style scoped>
.info {
  margin-top: 40px;
}
</style>