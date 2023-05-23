<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="Create Article">
        <p>Content Blogging</p>
      </b-jumbotron>
     
    </header>

    <div class="card card-container">
    
    <form name="form" @submit.prevent="createNode">
      <div class="form-group">
        <p>Title</p>
        <input
          v-model="article.title"
          type="text"
          class="form-control"
          name="title"
        />
      </div>

      
      <div class="form-group mt-3">
        <label for="content">Content</label>
        <SectionModal @logSection="logSection"></SectionModal>
      </div>

      <div v-if="article.section.length > 0">
        <div v-for="(section, index) in article.section" :key="index">
          <div>{{ section.title }}</div>
          <div>{{ section.content }}</div>
          <img :src="section.imageUrl" height="200">
        </div>
      </div>


        <div v-for="(obj, index) in sectionId" :key="index">
          <div>{{ obj }}</div>
        </div>
    


      <div class="form-group">
        <b-button variant="primary" @click="onPickFile">Upload image </b-button>
        <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">

        <img :src="imageUrl" height="200">

        <div class="add">{{ imgUrl.ipfsHash }}</div>
      </div>

      <div>
        <p>Category</p>
        <b-form-tags input-id="tags-basic" v-model="article.category"></b-form-tags>
      </div>
      <div class="form-group mt-2">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create</span>
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

import SectionModal from '../components/SectionModal.vue';

export default {
  name: 'createarticle',
  components: {
    SectionModal
  },
  meta: {
    auth: true,
  },
  data() {
    return {
      loading: false,
      message: '',
      article: {
        title: '',
        section: [],
        category: ['environment', 'nature']
      },
      image: null,
      imageUrl: ''

    };
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user
    }),
    ...mapGetters('article', {
      loadedImg: 'loadedImgUrl'
    }),
    ...mapGetters('article', {
      loadedSection: 'sectionId'
    }),
    imgUrl() {
      return this.loadedImg
    },
    sectionId() {
      return this.loadedSection
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    createNode: function() {
      this.loading = true;
      
        if (!this.article.title && !this.article.section) {
          this.loading = false;
          return;

        }
          const articleData = {
            title: this.article.title,
            section: this.sectionId, 
            category: this.article.category,
            imageUrl: "https://ipfs.io/ipfs/" + this.imgUrl.ipfsHash
          }
    
          this.$store.dispatch('article/createArticle', articleData)
          this.$router.push('/articles')
        
      

    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.$store.dispatch('article/uploadImg', files[0])

    },
    logSection (value) {

      this.article.section.push(value)
      
    }
  }
};
</script>
<style scoped>
.card-container.card {
  /*max-width: 450px !important;*/
  padding: 40px 40px;
}


.add {
  font-size: 8px;
}

.card {
  background-color: rgba(0,0,0,.6);
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>