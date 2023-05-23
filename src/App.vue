<template>
  <div id="app">
    <b-navbar toggleable="md" variant="palette12" type="dark" fixed="top">
      <b-navbar-brand class="mx-2" href="/">
        <img src="cham.png" width="65" height="40" class="d-inline-block">

      </b-navbar-brand>



      <b-navbar-toggle v-b-toggle.sidebar-1 target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/wallet" class="nav-link">Wallet</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="" class="nav-link"><s>Design</s></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/articles" class="nav-link">Blog</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/nfa" class="nav-link">NFA</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>


      <b-button @click="connectWallet" size="sm" variant="palette15">
        <b-icon icon="bag-fill"></b-icon>
        {{ wallet }}

      </b-button>

      <b-nav-item-dropdown v-if="currentUser" right no-caret class="d-flex">
        <template #button-content class="my-auto">
          <b-avatar :src="currentUser.imageUrl" href="/profile" />
        </template>
        <b-dropdown-item>
          <router-link to="/profile" class="nav-link">
            <b-icon icon="person" class="h5" />
            Profile
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/contract" class="nav-link">
            <b-icon icon="book" class="h5" />
            Contract
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/mint" class="nav-link">
            <b-icon icon="columns" class="h5" />
            Mint
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="logOut">
          <b-icon icon="arrow-right" class="h5" />
          log-Out
        </b-dropdown-item>
      </b-nav-item-dropdown>


      <b-nav-item-dropdown v-else right no-caret class="d-flex">
        <template #button-content class="my-auto">
          <b-icon icon="person-fill" />
        </template>
        <b-dropdown-item v-if="walletAddress" @click.prevent="web3Login">

          <b-icon icon="box-seam" />
          Web3 Login

        </b-dropdown-item>

        <b-dropdown-item v-else @click.prevent="connectWallet">

          <b-icon icon="bag-fill" />
          connect Wallet

        </b-dropdown-item>

        <b-dropdown-item>
          <router-link to="/register" class="nav-link">
            <b-icon icon="person-plus-fill" />
            Register
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/login" class="nav-link">
            <b-icon icon="person-fill" />
            Login
          </router-link>
        </b-dropdown-item>

      </b-nav-item-dropdown>



    </b-navbar>

    <b-sidebar id="sidebar-1" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <div v-if="currentUser">
            <h4 id="sidebar-no-header-title">{{ currentUser.username }}</h4>

            <p>
              {{ currentUser.email }}
            </p>
          </div>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item to="/wallet" @click="hide">
                <b-icon icon="bricks"></b-icon>
                Wallet
              </b-nav-item>
              <b-nav-item to="" @click="hide">
                <b-icon icon="layers"></b-icon>
                <s>Design</s>
              </b-nav-item>

              <b-nav-item to="/articles" @click="hide">
                <b-icon icon="card-text"></b-icon>
                Blog
              </b-nav-item>

              <b-nav-item to="/nfa" @click="hide">
                <b-icon icon="shop"></b-icon>
                NFA
              </b-nav-item>

              <hr />
              <b-nav-item to="/profile" @click="hide" v-if="currentUser">
                <b-icon icon="person"></b-icon>
                Profile
              </b-nav-item>
              <div v-else>
                <b-nav-item @click.prevent="web3Login">
                  <b-icon icon="box-seam"></b-icon>
                  Web3 Login
                </b-nav-item>

                <b-nav-item to="/register" @click="hide">
                  <b-icon icon="person-plus-fill"></b-icon>
                  Register
                </b-nav-item>
                <b-nav-item to="/login" @click="hide">
                  <b-icon icon="person-fill"></b-icon>
                  Login
                </b-nav-item>
              </div>
              <b-nav-item @click.prevent="logOut" v-if="currentUser">
                <b-icon icon="arrow-right"></b-icon>
                log-Out
              </b-nav-item>

              <h5 class="mt-3">Social Media</h5>

              <b-nav-item href="https://twitter.com/philmo_mu?s=20" @click="hide">
                <b-icon icon="twitter" />
                Twitter
              </b-nav-item>
              <b-nav-item href="https://www.instagram.com/philmo_mu/" @click="hide">
                <b-icon icon="instagram" />
                Instagram
              </b-nav-item>
              <b-nav-item href="https://medium.com/@pmosi76" @click="hide">
                <b-icon icon="medium" />
                Medium
              </b-nav-item>
              <b-nav-item href="https://ch.linkedin.com/in/phil-mo-1630bb13a" @click="hide">
                <b-icon icon="linkedin" />
                Linkedin
              </b-nav-item>

            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>



    <div class="background-container">
      <div class="cover">

        <div class="bckg text-dark">

          <router-view />

        </div>
      </div>

      <div class="footer">

        <div class="content text-dark">

          <div class=" text-center">




            <b-row align-v="center">
              <b-col lg="4" md="4" sm="4" xs="12">

                <b-img src="/cham.png" height="60"></b-img>

              </b-col>
              <b-col lg="4" md="4" sm="4" xs="6">

                <div class="txtfooter">
                  <div>Help</div>
                  <div><router-link to="/community">Community</router-link></div>
                  <div>Project R&D</div>
                  <div>Services</div>
                </div>
              </b-col>


              <b-col lg="4" md="4" sm="4" xs="12">

                <div class="txtfooter">
                  <div>View on Chain</div>
                  <div><router-link to="/ecosystem">Ecosystem</router-link></div>
                  <div><router-link to="/whitepaper">White paper</router-link></div>
                  <div>Terms & condition</div>
                </div>
              </b-col>
            </b-row>

            <div class="text-center mt-3 add text-dark">
              developed in Switzerland, MIT License style 2023, phil@philmo.ch
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-alert v-model="showMessage" class="position-fixed fixed-bottom m-0 rounded-0" style="z-index: 2000;"
      variant="warning" dismissible>
      {{ message }}
    </b-alert>

  </div>
</template>

<script>
import EventBus from "./common/EventBus";
export default {
  data() {
    return {
      showMessage: false
    };
  },
  metaInfo() {
    return {
      title: "Outlier Art",
      meta: [
        { vmid: 'description', name: 'description', content: 'Outlier Art' },
        { vmid: 'og:title', property: 'og:title', content: "Outlier Art" },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'Outlier Art' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' }
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    walletAddress() {
      return this.$store.getters['nft/loadedWallet'];
    },
    wallet() {
      if (this.walletAddress === '') {
        return 'Connect Wallet'
      } else {
        return String(this.walletAddress).substring(0, 4) + "..." + String(this.walletAddress).substring(38);
      }
    },
    message() {
      return this.$store.getters['nft/getMessage'];
    }
  },
  watch: {
    message(value) {
      if (value) {
        this.showMessage = true;
      }
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    web3Login: function () {
      // check if walletaddress is set or call connectWallet
      if (this.walletAddress === '') {
        this.connectWallet();
      }
      const userObj = {
        address: this.walletAddress
      };
      // dispatch login passing walletaddress
      this.$store.dispatch('auth/web3Login', userObj);
    },
    connectWallet: function () {
      this.$store.dispatch('nft/connectWallet');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
</script>
<style scoped>
.background-container {
  position: absolute;
  min-width: 100%;
  height: 100%;
  z-index: -1;
}

.cover {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  background-color: #f8f9fa;
  background-size: 400% 400%;
  z-index: -1;
}

.bckg {
  background-color: #f8f9fa;
  padding-top: 65px;
  padding-bottom: 120px;
  height: 100%;
}

.footer {
  display: flex;
}

.content {
  display: inline-block;
  align-self: flex-end;
  width: 100%;
  background: linear-gradient(to bottom, #e6c7b4, #3c5ba0);
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.txtfooter {
  font-size: 9pt;
}

.add {
  font-size: 8px;
}
</style>