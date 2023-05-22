<template>
  <div class="main">
    <div class="home">


      <div class="home2 container">
        <div class="imgBckg">
          <b-row>
            <b-col md="6" sm="6" class="mt-3">

            </b-col>
            <b-col md="6" sm="6" class="mt-3">


            </b-col>
          </b-row>
        </div>
      </div>

      <div class="container overlap">
        <div class="content container">

          <b-row>

            <b-col lg="6" md="6" sm="6" xs="12">
              <div class="block1 container">
                <h1>{{ article.title }}</h1>
                <!-- Visual <Identity-->
                <p>{{ article.date | date }} - <b-icon icon="person-fill"></b-icon> {{ article.author }}</p>

              </div>
            </b-col>
            <b-col lg="6" md="6" sm="6" xs="12">


            </b-col>

          </b-row>

        </div>
      </div>
    </div>


    <div class="block12">
      <div class="container text-dark">

        <b-row>

          <b-col lg="6" md="6" sm="6" xs="12">
            <div class="block1 container">

              <h3 v-for="(section, i) in article.section" :key="i">
                {{ section.title }}
              </h3>

            </div>
          </b-col>
          <b-col lg="6" md="6" sm="6" xs="12">

            <b-img v-if="article.imageUrl" :src="article.imageUrl" fluid centered></b-img>

          </b-col>

        </b-row>

        <b-row align-v="center" class="mt-3 mb-3" v-for="(section, index) in article.section" :key="index">
          <template v-if="index % 2 === 0">
            <b-col md="6" sm="6">
              <div class="mt-3 title">{{ section.title }}</div>
              <div class="content mb-3" v-html="section.content"></div>
            </b-col>
            <b-col md="6" sm="6">
              <b-img v-if="section.imageUrl" :src="section.imageUrl" fluid rounded></b-img>
            </b-col>
          </template>
          <template v-else>
            <b-col md="6" sm="6">
              <b-img v-if="section.imageUrl" :src="section.imageUrl" fluid rounded></b-img>
            </b-col>
            <b-col md="6" sm="6">
              <div class="mt-3 title">{{ section.title }}</div>
              <div class="content mb-3" v-html="section.content"></div>
            </b-col>
          </template>
        </b-row>
        <b-row align-v="center">



          <b-col class="mt-3 mb-3">
            <b-button-group class="m-1" v-for="category in article.category" :key="category" size="sm">
              <b-button>{{ category }}</b-button>
            </b-button-group>
          </b-col>
          <b-col cols="auto">
            <b-button variant="danger" v-if="currentUser" @click="setLike(article.id)" size="sm">
              <b-icon v-if="hasLiked" icon="heart"></b-icon>
              <b-icon v-else icon="heart-fill"></b-icon>
              <span class="subheading mx-1">{{ article.likes }}</span>
            </b-button>
            <b-button v-if="currentUser" class="ml-2" variant="primary" size="sm" :to="'/editarticle/' + article.id">
              <b-icon icon="pencil-square" />
            </b-button>
            <DeleteModal v-if="currentUser" class="mt-2" :path="'article/deleteArticle'" :id="article.id" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="likedby mt-2">
              <b-icon icon="heart"></b-icon>
              <span v-for="user in article.like" :key="user" class="subheading mr-2"> {{ user }},</span>
            </div>
            <hr />
            <div class="comment">
              <div>Comments</div>
              <div class="mt-3 mb-3" v-for="comment in article.comment" :key="comment._id">
                <div>{{ comment.date | date }} - <b-icon icon="person-fill"></b-icon> {{ comment.author }}</div>
                <div>{{ comment.content }}</div>
              </div>
              <form v-if="currentUser" name="form" @submit.prevent="createNode">
                <b-form-textarea id="comment" v-model="comment" placeholder="..." rows="3" max-rows="6"></b-form-textarea>
                <b-button type="submit" class="btn btn-block mt-2" :disabled="loading">Comment</b-button>
              </form>
            </div>
          </b-col>
        </b-row>






      </div>
    </div>



  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import DeleteModal from '../components/DeleteModal2.vue'

export default {
  name: 'Post',
  props : ['id'],
  data() {
    return {
      loading: false,
      comment: ''
    };
  },
  components: {
    DeleteModal
  },
  mounted() {
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user
    }),
    ...mapGetters('article', {
      loadedArticle: 'loadedArticle'
    }),
    article() {
      return this.loadedArticle(this.id)
    },
    hasLiked() {
      if (this.article.like) {
        return this.article.like.findIndex(username => {
          return username === this.currentUser.username
        }) < 0
      } else {
        return -1
      }
    },
  },
  methods: {
    createNode: function () {
      this.loading = true;
      if (this.comment) {
        const commentData = {
          id: this.id,
          content: this.comment
        }
        this.$store.dispatch('article/commentArticle', commentData)
        this.loading = false;
      }

    },
    setLike: function (id) {
      this.$store.dispatch('article/likeArticle', id)
    }
  }
};
</script>
<style scoped>
.likedby {
  font-size: 12px;
}

.comment {
  font-size: 12px;
}

.title {
  font-size: 16px;
}

.content {
  font-size: 14px;
}
</style>