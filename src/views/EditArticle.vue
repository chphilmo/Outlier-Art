<template>
  <div class="container">
    <header class="jumbotron">

      <b-jumbotron text-variant="dark" header="Edit Article">
        <p>{{ title }}</p>
      </b-jumbotron>

    </header>

    <div class="card card-container">

      <form name="form" @submit.prevent="createNode">
        <div class="form-group">
          <p>Title</p>
          <input v-model="title" type="text" class="form-control" name="title" />
        </div>

        <div class="form-group mt-3">
          <label for="content">Content</label>
          <EditSectionModal @updateSection="updateSection" :article="article"></EditSectionModal>
        </div>

        <div class="form-group mt-3">
          <label for="content">Content</label>
          <SectionModal @logSection="logSection"></SectionModal>
        </div>

        <div class="form-group">
          <div v-if="section.length > 0">
            <div v-for="(section, index) in section" :key="index">

              <div>{{ section.title }}</div>
              <div>{{ section.content }}</div>
              <img v-if="section.imageUrl" :src="section.imageUrl" height="200">
            </div>
          </div>

         
          <div v-if="newSection.length > 0">
            <div v-for="(section, index) in newSection" :key="index">
            
              <div>{{ section.title }}</div>
              <div>{{ section.content }}</div>
              <img v-if="section.imageUrl" :src="section.imageUrl" height="200">
            </div>
          </div>    


          <div v-for="(obj, index) in sectionId" :key="index">
            <div>{{ obj }}</div>
          </div>

        </div>

        <div class="form-group mt-2">
          <b-button variant="primary" @click="onPickFile">Upload image </b-button>
          <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">

          <img v-if="imageUrl" :src="imageUrl" height="200">

          <img v-if="imgUrl.imageUrl" :src="imgUrl.imageUrl" height="200">
        </div>

        <div>
          <label for="category">Category</label>
          <b-form-tags input-id="tags-basic" v-model="category"></b-form-tags>
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

import { mapState, mapGetters } from 'vuex'

import SectionModal from '../components/SectionModal.vue'
import EditSectionModal from '../components/EditSectionModal.vue'

export default {
  name: 'editarticle',
  middleware: 'auth',
  components: {
    SectionModal: SectionModal,
    EditSectionModal: EditSectionModal
  },
  props: ['id'],
  data() {
    return {
      loading: false,
      message: '',
      image: null,
      imageUrl: '',
      title: '',
      section: [],
      newSection: [],
      category: []

    };
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user
    }),
    ...mapGetters('article', {
      loadedArticle: 'loadedArticle'
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
      const newSection = this.loadedSection
      const articleSection = this.article.section.map((section) => {
        return section._id
      })
      return [...articleSection, ...newSection]
    },
    article() {
  
      return this.loadedArticle(this.id)
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.loadArticle()
  },
  methods: {
    loadArticle: function () {
      this.title = this.article.title
      this.section = this.article.section
      this.category = this.article.category
      this.imageUrl = this.article.imageUrl
    },
    createNode: function () {
      this.loading = true;



      if (!this.title && !this.section) {
        this.loading = false;
        return;
      }

      const articleData = {
        id: this.article.id,
        title: this.title,
        section: this.sectionId,
        category: this.category,
        imageUrl: this.imgUrl.imageUrl || this.imageUrl
      }

      this.$store.dispatch('article/editArticle', articleData)
      this.$router.push('/article/' + this.article.id)
      this.loading = false;


    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.article.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.$store.dispatch('article/uploadImg', files[0])

    },
    logSection: function (section) {
      this.newSection.push(section)
    },
    updateSection: function (section) {
      this.section.forEach((item, index) => {
        if (item._id === section.id) {
          this.section[index] = section
        }
      })
    }
  }
};
</script>
<style scoped>
.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: rgba(0, 0, 0, .6);
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