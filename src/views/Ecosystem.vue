<template>
    <div class="main">
        <div class="home">


<div class="home2 container">
  <div class="imgBckg">
    <b-row>
      <b-col md="6" sm="6" xs="6" class="mt-3">

        <div class="block1 content">

          <h1 class="title">Ecosystem</h1>
          <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

          <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

    

        </div>

      </b-col>
      <b-col md="6" sm="6" xs="6" class="mt-3">
        <div class="container">
        <div class="content3 text-dark">
    
          <h6>
            Generative Art Marketplace Testnet
          </h6>
          <h6>
            Interactive Twitter Bot
          </h6>
          
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

        

        <div class="block2">
      <div class="container text-dark">

    
        <b-row align-v="center" class="mt-5">

          <b-col md="6" sm="6">
            <!-- display link to reference website with image: https://ecosys.app -->
            <a :href="'https://dapp.69e8.art'">
              <b-img src="/d69e8.JPG" fluid center rounded></b-img>
            </a>
          </b-col>

          <b-col md="6" sm="6">
            <!-- display text for the link ecosys.app -->
            <h5>Generative 69E8</h5>
            <div>Generative art marketplace in development on Ethereum blockchain.
            </div>


          </b-col>

        </b-row>

        <b-row align-v="center">

          <b-col md="6" sm="6">

            <h5>Twitter IO Bot</h5>
            <div>Headless twitter interface to manage your twitter account.
            </div>

          </b-col>

          <b-col md="6" sm="6" class="mt-3">
            <!-- display link to reference website with image: https://wallet.ecosys.app -->
            <a :href="'https://io.philmo.ch'">
              <b-img src="/io.jpg" fluid center rounded></b-img>
            </a>


          </b-col>

        </b-row>


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
        this.$store.commit('web3/setMessage', "Welcome to Outlier Art Open on Mumbai Testnet | dev 40% ");
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        walletAddress() {
            return this.$store.getters['web3/loadedWallet'];
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
    }
};
</script>
<style scoped>

.title {
    font-size: 50pt;
    font-weight: 400;
}

.logo {
    /*max-height: 200px;*/
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

.block2 {
    background-color: #f8f9fa;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: justify;
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
}</style>