<template>
  <div class="main">

    <div class="home">


      <div class="home2 container">
        <div class="imgBckg">
          <b-row>
            <b-col md="6" sm="6" xs="6" class="mt-3">

              <div class="block1 content">

                <h1 class="title">Outlier art</h1>
                <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

                <!--<b-img class="mb-3" src="/outlier.png" min-height="300px" fluid></b-img>-->

                <b-button-group class="mt-3" v-if="!currentUser">
                  <b-button variant="palette21" size="sm" @click.prevent="web3Login">WEB3</b-button>
                  <b-button variant="palette22" size="sm" :to="'/register'"><b-icon icon="person-plus-fill" /></b-button>
                  <b-button variant="palette23" size="sm" :to="'/login'"><b-icon icon="person-fill" /></b-button>

                </b-button-group>
                <div v-else>
                <b-button-group class="mt-3">
                  <b-button variant="palette31" size="sm" :to="''"><b-icon icon="plus" />Projet</b-button>
                  <b-button variant="palette32" size="sm" :to="'/mint'"><b-icon icon="plus" />NFA</b-button>
                  
                </b-button-group>
                <b-button class="mt-3 ml-2" variant="palette34" size="sm" :to="'/createarticle'"><b-icon icon="plus" />Article</b-button>
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
                  Open Source WEB3 community
                </h6>
                <h6>
                  Collaborative Crowdsourcing
                </h6>
                <b-button-group class="mt-3">
                  <b-button variant="palette14" size="sm" :to="''"><b-icon icon="brush" /><s>Design</s></b-button>
                  <b-button variant="palette15" size="sm" :to="'/articles'"><b-icon icon="clipboard" /> Blog</b-button>
                </b-button-group>

                <b-button variant="palette13" size="sm" :to="'/nfa'" class="mt-3 ml-2">Marketplace</b-button>
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
            <b>ƒ</b> Crowdsourcing collaborative design -  <b>ƒ</b> Open source knowledge access -  <b>ƒ</b> Crypto art and currency trading
            - <b>ƒ</b> Decentralized Application marketplace
          </div>

        </b-col>
      </b-row>

    </div>





    <div class="blockintro">

      <div class="container text-dark">





        <b-row align-v="center">
          <b-col md="6" sm="6">
            <div class="block1">


              <h1>outlier art</h1>


              <div class="mt-3">
                We handle the development of your web project
                with a team of artists and developers -
                letting your earn passive income from our crowdsourcing
                mechanism - making use of the Blockchain to ensuring transparency
                in all steps of the process.
              </div>



            </div>
          </b-col>

          <b-col md="6" sm="6">

            <b-img class="mb-3" src="/polar-bear.png" fluid></b-img>

          </b-col>

        </b-row>

      </div>
    </div>










    <div class="block65">
      <div class="container text-dark">

        <div class="text-center mb-3">

          <h1>Social ecology</h1>

        </div>
        <b-row align-v="center" class="mt-3">
          <b-col md="6" sm="6">

            <b-img src="/ladybug.png" fluid></b-img>

          </b-col>
          <b-col md="6" sm="6">

            <div class="mt-3">We belive in social ecology and apply its concepts to emerging technologies such as the
              Blockchain and Web3.</div>
            <div class="mt-3">We build web applications hosted on the Decentralized web to prevent censorship and
              downtime around the world.</div>
            <div class="mt-3">We develop systems to enhance knowledge access through crowdsourcing, collaborative
              design and open source cookbooks.
            </div>



          </b-col>

        </b-row>

      </div>
    </div>


    <div class="block12">
      <div class="container text-dark">

        <b-row align-v="center" class="mt-5 mb-3">
          <b-col md="6" sm="6">
          </b-col>
          <b-col md="6" sm="6">
            <h1>Product</h1>
          </b-col>

        </b-row>
        <b-row align-v="center">

          <b-col md="6" sm="6">
            <h3>Web applications</h3>
            <div class="mb-3">Building <b>tokenized</b> web applications on the <b>Blockchain</b>
              to redefine ownership, governance and continuous <b>maintenance</b> over time.
            </div>


            <div>
              By leveraging the power of <b>decentralization</b> we building
              scalable applications using Blockchain's
              <ul class="mt-3">
                <li>
                  <b> immutability</b> to redefine ownership
                </li>
                <li>
                  <b> interoperability</b> to ensure censorship resistance
                </li>
                <li>
                  <b> governance</b> to guarantee maintenance over time
                </li>
              </ul>

            </div>

            <div>

              Making use of smart contracts on the Ethereum Blockchain, we develop
              new concepts of interaction between <b>designers</b>, <b>developers</b> and <b>consumers</b>
              that guarantee the sustainability of the application over time.

            </div>
          </b-col>

          <b-col md="6" sm="6">


            <b-img src="/blockchip.png" fluid center></b-img>

          </b-col>

        </b-row>
        <b-row align-v="center" class="mt-5">

          <b-col md="6" sm="6">

            <div class="txtdisp text-center">

              <h1>ARK | Token</h1>

            </div>

          </b-col>

          <b-col md="6" sm="6" class="mt-3">

            <h3>Crowdsourcing</h3>

            <div>Crowdfunding</div>
            <div class="mt-3">
              ARK Token is a currency sustaining the Outlier ecosystem
              by rewarding contributors and funding the development of your project.
            </div>

            <div class="mt-3">
              It allows users to <b>crowdsource</b> our
              <b>collaborative design</b> process through a consensus mechanism
              involving no third party.

            </div>

            <div class="mt-3">
              Focusing on <b>utility</b>, the token can be used to:
              <ul class="mt-3">
                <li>vote on the direction of the project</li>
                <li>fund the development of new features</li>
                <li>ensure updates and upgrades</li>
                <li>reward contributors</li>
              </ul>
            </div>

            <div class="text-center">
              <b-button class="mt-3" variant="nature1" size="md" to="/wallet">
                Get some ARK
              </b-button>
            </div>


          </b-col>

        </b-row>




      </div>
    </div>


    <hr />


    <div class="block2">

      <div class="container text-dark">
        <b-row align-v="center" class="mt-3 mb-3">
          <b-col md="6" sm="6">
            <h1>Art</h1>
          </b-col>
          <b-col md="6" sm="6">

          </b-col>

        </b-row>

        <b-row align-v="center" class="mt-5">

          <b-col md="6" sm="6">
            <h3>Collaborative design</h3>
            <div class="mb-3">Between Visual identity, branding and digital product design,
              we create innovative solutions to enhance the user experience while
              allowing artists to express their creativity.
            </div>
            <div class="mb-3">Working with the reliability of the Blockchain, all
              decisions are made under a <b>consensus mechanism</b> that regulates
              the direction of the project and ensure consistency while innovating.
            </div>

          </b-col>

          <b-col md="6" sm="6">


            <b-img src="/interact.png" height="220" center></b-img>

          </b-col>

        </b-row>


        <b-row align-v="center">
          <b-col md="6" sm="12">

            <b-img src="/spiral.png" height="220"></b-img>
          </b-col>
          <b-col md="6" sm="12" class="mt-5">
            <h3>Interaction Design</h3>
            <div class="mt-3">Founded on the principles of <b>social ecology</b>,
              our team is composed of multidisciplinary artists and developers
              working together to ensure the accessibility and user experience of our product.

            </div>

            <div class="mt-3">From engravers, photographs, generative artist to web developer
              we empowering visual expression through interactive applications.
            </div>



          </b-col>
        </b-row>

      </div>
      <hr />
    </div>



    <div class="block3">
      <div class="container text-center text-dark">
        <b-card bg-variant="light">

          <b-img class="mx-3" src="/ethereumlogo.png" height="60"></b-img>
          <b-img class="mx-3" src="/metamaskfox.png" height="60"></b-img>

          <div class="add2 mt-3"><a href="https://metamask.io/download/">Installing Metamask</a></div>
          <div>Adding ARK Token</div>


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
        { vmid: 'description', name: 'description', content:  'Outlier Art' },
        { vmid: 'og:title', property: 'og:title', content: "Outlier Art" },
        { vmid: 'og:site_name', property: 'og:site_name', content: 'Outlier Art' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },    
        { name: 'robots', content: 'index,follow' } 
      ]
    }
  },
  mounted() {
    this.$store.commit('nft/setMessage', "Welcome to Outlier Art on Mumbai Testnet | dev 40% ");
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
}

.heading {

  background: linear-gradient(to bottom, #e6c7b4, #e6c7b4);
  padding-top: 30px;
  height: calc(30vh - 60px);

}

.layer {
  background: linear-gradient(to bottom, #e6c7b4, #e6c7b4);
  padding: 30px;
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

.block22 {
  background-color: #f8f9fa;
  height: 50vh;
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

.block4 {
  background: linear-gradient(to bottom, #f2e9ba, #f8f9fa);
  padding-top: 60px;
  padding-bottom: 60px;
  display: block;
}

.blockintro {
  background-color: #f8f9fa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.block5 {
  position: relative;
  background-color: #69F0AE;

}


.block65 {
  background: linear-gradient(to bottom, #e6c7b4, #3c5ba0);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;


}

.block7 {
  background-color: #f8f9fa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.block8 {
  position: relative;
  bottom: 0;
  display: flex;
  width: 100%;
}

.block9 {
  position: relative;

  background-color: #f8f9fa;
  padding-top: 10px;
  padding-bottom: 10px;
}

.block10 {
  position: relative;
  background-color: #b6edd3;
  padding: 10px;

}

.block11 {
  position: relative;
  background-color: #69F0AE;
  padding: 10px;

}

.block111 {
  position: relative;
  background-color: #00E676;
  padding: 10px;

}

.block112 {
  position: relative;
  background-color: #b6edd3;
  padding: 10px;

}

.block12 {
  background-color: #f8f9fa;
  text-align: justify;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.block13 {
  position: relative;
  background-color: #64FFDA;
  padding-top: 40px;
  padding-bottom: 40px;

}

.block14 {
  position: relative;
  background-color: #64FFDA;
  height: 35px;

}


.box1 {
  padding: 10px;
  position: relative;
  background-color: #64FFDA;
  border-radius: 10px;

}

.box2 {
  padding: 10px;
  position: relative;
  background-color: #f2e9ba;
  border-radius: 10px;

}

.home {
  position: relative;
  top: 0;
  height: 70vh;
  display: block;
  padding-bottom: 20px;
  background: linear-gradient(to bottom, #3c5ba0, #e6c7b4);

}

.home1 {
  position: relative;
  top: 0;
  height: 50vh;
  display: flex;
  padding-bottom: 20px;


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

.home3 {
  position: relative;


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

.content4 {
  display: inline-block;
  align-self: flex-end;
  border-bottom: 3px solid #000000;
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

.txtdisp {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 38px;
}

.vcenter {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ln {
  border: 1px solid #7c7c7c;
}

.main {
  overflow: hidden;
}
</style>