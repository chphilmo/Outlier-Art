<template>
  <div class="main">

    <div class="home">


      <div class="home2 container">
        <div class="imgBckg">
          <b-row>
            <b-col md="6" sm="6" xs="6" class="mt-3">

              <div class="block1 content">

                <h1 class="title">Outlier Art</h1>
                <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

                <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

                <b-button-group class="mt-3" v-if="!currentUser">
                  <b-button v-if="walletAddress" variant="palette21" size="sm" @click.prevent="web3Login">WEB3</b-button>
                  <b-button v-else variant="palette21" size="sm" @click.prevent="connectWallet">Connect Wallet</b-button>
                  <b-button variant="palette22" size="sm" :to="'/register'"><b-icon icon="person-plus-fill" /></b-button>
                  <b-button variant="palette23" size="sm" :to="'/login'"><b-icon icon="person-fill" /></b-button>

                </b-button-group>
                <div v-else>

                  <b-button class="mt-3 ml-2" variant="palette34" size="sm" :to="'/createarticle'"><b-icon
                      icon="plus" />Article</b-button>
                </div>


              </div>

            </b-col>
            <b-col md="6" sm="6" xs="6" class="mt-3">
              <div class="container">
                <div class="content3 text-dark">
                  <h4>Welcome to Outlier art</h4>
                  <h6>
                    Media Interactive Design
                  </h6>
                  <h6>
                    Trust and Help Community
                  </h6>
                  <h6>
                    Open Source WEB3 community
                  </h6>
                  <b-button-group class="mt-3">
                    <b-button variant="palette14" size="sm" :to="''"><b-icon icon="brush" /><s>Design</s></b-button>
                    <b-button variant="palette15" size="sm" :to="'/articles'"><b-icon icon="clipboard" /> Blog</b-button>
                  </b-button-group>

                  <b-button variant="palette13" size="sm" :to="'/community'" class="mt-3 ml-2">Community</b-button>
                </div>
              </div>

            </b-col>
          </b-row>
        </div>


      </div>

      <div class="container overlap">
        <div class="content container">

          <b-row>
            <b-col md="6" sm="6" xs="6" class="mt-3">

            </b-col>
            <b-col md="6" sm="6" xs="6" class="mt-3">
              <b-img class="logo mb-3" src="/cham.png" height="500" center></b-img>
            </b-col>

          </b-row>

        </div>
      </div>


    </div>


    <div class="heading">

      <b-row align-v="end" class="container">
        <hr />
        <b-col lg="6" md="6" sm="6" xs="6">
          <div class="container add content2">
            <div>Art</div>
            <div>Design</div>
            <div>Development</div>

          </div>
        </b-col>
        <b-col lg="6" md="6" sm="6" xs="6" class="add text-justify">

          <div class="add2">
            <b>ƒ</b> Open source knowledge access - <b>ƒ</b> Crypto art

          </div>

        </b-col>
      </b-row>

    </div>





    <div class="blockintro">

      <div class="container text-dark">





        <b-row align-v="center">
          <b-col md="6" sm="6">
            <div class="block1">


              <h1>Outlier Art</h1>


              <div class="mt-3">


                Outlier Art is a blog about Arts, generative art, creative coding and crypto art.
                It merges two Twitter groups into one, the <b>Interactive Design</b> (Generative Art, Creative Coding) and
                <b>Trust and Help Community</b> (All mediums Art),
                through a platform that allows to share knowledge and resources.
              </div>



            </div>
          </b-col>

          <b-col md="6" sm="6">

            <b-img class="mb-3" src="/matic.png" fluid></b-img>

          </b-col>

        </b-row>

      </div>
    </div>










    <div class="block65">
      <div class="container text-dark">

        <div class="text-center mb-3">

          <h1>Interactive Design</h1>

        </div>
        <b-row align-v="center" class="mt-3">
          <b-col md="6" sm="6">

            <b-img src="/ladybug.png" fluid></b-img>

          </b-col>
          <b-col md="6" sm="6">

            <div class="mt-3">

              The idea of an Interactive Design group is born from the will of making <b>generative art</b>, <b>creative
                coding</b>
              and <b>web development</b>
              more accessible while including everyone in the creative process sharing resources to bettering growth and
              tackle the market.
            </div>

            <div class="mt-3">
              From people willing to dig into the domain to others just curious, we create a dynamic that
              enhance productivity and fun in a creative environment through Twitter groups and the following blog on the
              web.
            </div>

            <div class="mt-3">
              Contact <a href="https://twitter.com/philmo_mu"><b-icon icon="twitter" />
                @philmo_mu</a> 
            </div>



          </b-col>

        </b-row>

      </div>
    </div>




    <div class="block12 mt-5">
      <div class="container text-dark">

        <div class="text-center mb-3">

          <h1>Trust and Help Community</h1>

        </div>
        <b-row align-v="center" class="mt-3">

          <b-col md="6" sm="6">

            <div class="mt-3">

              Trust and Help Community is a group of artists that share their knowledge and resources to help each other
              in a fun an creative environment.
            </div>

            <div class="mt-3">
              Contact <a href="https://twitter.com/EdmundBoissier"><b-icon icon="twitter" />
                @EdmundBoissier</a> | <a href="https://twitter.com/gravotopia"><b-icon icon="twitter" />
                @gravotopia</a>
            </div>

          </b-col>

          <b-col md="6" sm="6">

            <b-img src="/galaxy.png" fluid></b-img>

          </b-col>

        </b-row>

      </div>
    </div>

    <div class="block3">
      <div class="container text-center text-dark">
        <b-card bg-variant="light">

          <b-img class="mx-3" src="/metamaskfox.png" height="60"></b-img>

          <div class="add2 mt-3">Register/Login with Metamask (WEB3)</div>
          <div class="add2">Register/Login with Email and Password</div>


        </b-card>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      content: ''
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
  mounted() {
    this.$store.commit('nft/setMessage', "Welcome to Outlier Art | dev 60% ");
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

  },
  methods: {
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
  }
};
</script>
<style scoped>
.spacer {
  height: 60px;
}

.add {
  font-size: 14pt;
}

.add2 {
  font-size: 10pt;
}

.title {
  font-size: 50pt;
  font-weight: 400;
}

.logo {
  /*max-height: 200px;*/
  /*margin-top: 70px;*/
}

.heading {

  background: linear-gradient(to bottom, #e6c7b4, #e6c7b4);
  padding-top: 30px;
  height: calc(30vh - 60px);

}


.block1 {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
}


.block3 {
  background-color: #f8f9fa;
  padding-top: 60px;
  display: block;
}


.blockintro {
  background-color: #f8f9fa;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
}


.block65 {
  background: linear-gradient(to bottom, #e6c7b4, #3c5ba0);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
  padding-top: 60px;
  padding-bottom: 60px;
}

.block12 {
  background-color: #f8f9fa;
  text-align: justify;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

}



.home {
  position: relative;
  top: 0;
  height: 70vh;
  display: block;
  padding-bottom: 20px;
  background: linear-gradient(to bottom, #3c5ba0, #e6c7b4);

}


.home2 {
  position: relative;
  top: 130px;
  right: 10px;
  height: 50vh;
  display: flex;
  z-index: 1;
  justify-content: center;


}


.content {
  display: inline-block;
  align-self: flex-end;
  padding: 10px;

}

.content2 {
  display: inline-block;
  align-self: flex-end;

  height: 100%;
  padding: 10px;
}

.content3 {
  display: inline-block;
  align-self: flex-end;
  border-left: 3px solid #000000;
  height: 100%;
  padding: 10px;

}

.imgBckg {
  display: inline-block;
  align-self: flex-end;
  justify-content: center;
}

.overlap {
  position: absolute;
  top: 30px;
  left: 0px;
  z-index: 0;
}

.content1 {
  display: inline-block;
  align-self: flex-end;
}


.main {
  overflow: hidden;
}
</style>