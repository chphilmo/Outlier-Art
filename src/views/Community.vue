<template>
    <div class="container">

        <header class="jumbotron">

            <b-jumbotron text-variant="dark" header="Community">
                <p>Artists | Web Developers | Cryptotraders</p>
            </b-jumbotron>
        </header>

        <b-row>
            <b-col cols="6" v-for="user in getUsers" :key="user.id">
                <b-card bg-variant="light" class="mt-2" text-variant="dark">
                    <b-avatar :src="user.imageUrl" :href="'/creators/' + user.id"></b-avatar>
                    <b-card-text>
                        <div><b>{{ user.username }}</b> <b-icon v-if="user.verified" icon="check-circle" /> </div>
                        <div>{{ String(user.address).substring(0, 6) + "..." + String(user.address).substring(40) }} <b-icon
                                v-if="user.whitelisted" icon="check-circle" /> </div>
                        <div>{{ user.bio }}</div>
                        <div><b-icon icon="globe" /> {{ user.website }}</div>
                        <div><b-icon icon="twitter" /> {{ user.twitter }}</div>
                        <div v-for="(role, index) in user.role" :key="index">{{ role.name }}</div>
                        <DeleteModal v-if="currentUser && currentUser.role[0] == 'ROLE_ADMIN'" :id="user.id" />
                        <Whitelist class="mt-2" v-if="currentUser && currentUser.role[0] == 'ROLE_ADMIN' && !user.whitelisted" :address="user.address"
                            @whitelistAddress="whitelistAddress" />
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>

    </div>
</template>
  
<script>

import DeleteModal from '../components/DeleteModal.vue';
import Whitelist from '../components/Whitelist.vue';

export default {
    name: 'Creators',
    components: {
        DeleteModal,
        Whitelist
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        getUsers() {
            
            return this.$store.getters['auth/loadedCreators'];
        }
    },
    methods: {
        whitelistAddress: function (address) {
            const data = {
                address: address
            }
            this.$store.dispatch('nft/whitelistAddress', data)

        },
    }
};
</script>
<style scoped></style>