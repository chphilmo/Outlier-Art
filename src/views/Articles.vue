<template>
  <div class="container">
    <header class="jumbotron">
      <b-button variant="primary" :to="'/createarticle'">
        <b-icon icon="plus"></b-icon>
        <span>Create</span>
      </b-button>
      <b-jumbotron text-variant="dark" header="Blog & Articles">
        <p>Content blogging</p>
      </b-jumbotron>
    </header>
    <div class="mt-3 mb-3">
      <div>
        <b-button class="m-1" size="sm" :class="{ active: currentFilter === 'all' }
          " @click="setFilter('all')">
          all
        </b-button>
        <b-button v-for="category in categories" :key="category" class="m-1" size="sm"
          :class="{ active: currentFilter === category }" @click="setFilter(category)">
          {{ category }}
        </b-button>
      </div>
    </div>
    <div>
      <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '10px', 700: '5px'}" >
        <b-card v-for="article in filteredArticles" :key="article._id" bg-variant="dark" class="m-2" text-variant="light"
          :header="article.title" :img-src="article.imageUrl" style="max-width: 20rem;">

          <div class="date">
            {{ article.date | date }}
          </div>
          <div class="author">
            <b-icon icon="person-fill" />
            {{ article.author }}
          </div>
          <div class="mt-3 mb-3">
            <b-button-group v-for="footprint in article.footprint" :key="footprint" class="m-1" size="sm"
              :class="{ active: currentFilter === footprint }" @click="setFilter(footprint)">
              <b-button>{{ footprint }}</b-button>
            </b-button-group>
          </div>
          <b-row>
            <b-col>
              <b-button :to="'/article/' + article.id" size="sm" variant="palette13">
                Open
              </b-button>
            </b-col>
            <b-col cols="auto">
              <b-button variant="danger" :disabled="!currentUser" size="sm" @click="setLike(article.id)">
                <b-icon v-if="hasLiked" icon="heart" />
                <b-icon v-else icon="heart-fill" />
                <span class="subheading mx-1">{{ article.likes }}</span>
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col />
            <b-col cols="auto" class="mt-2">
              <b-button variant="light" disabled size="sm">
                <b-icon icon="card-text" />
                <span class="subheading mx-1">{{ nbOfComment(article.id) }}</span>
              </b-button>
            </b-col>
          </b-row>

        </b-card>
      </masonry>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Article-post',
  data() {
    return {

      currentFilter: 'all'
    }
  },
  computed: {
    ...mapState('auth', {
      currentUser: (state) => state.user
    }),
    articles() {
      return this.$store.getters['article/loadedArticles']
    },
    categories() {
      return this.$store.getters['article/loadedCategory']
    },
    filteredArticles: function () {
      const articles = this.articles
      if (this.currentFilter === 'all') {
        return articles
      } else {
        return this.articles.filter((article) => {
          const category = []
          for (const obj in article.category) {
            category.push(article.category[obj])
          }
          return category.includes(this.currentFilter)
        })
      }
    }
  },
  mounted() {

  },
  methods: {
    setFilter: function (filter) {
      this.currentFilter = filter
    },
    setLike: function (id) {
      this.$store.dispatch('article/likeArticle', id)
    },
    hasLiked(article) {
      if (article.like) {
        return article.like.findIndex((username) => {
          return username === this.user.name
        }) < 0
      } else {
        return -1
      }
    },
    nbOfComment(id) {
      const article = this.articles.find((article) => {
        return article.id === id
      })
      if (article.comment) {
        return article.comment.length
      } else {
        return 0
      }
    }
  }
}
</script>
<style scoped>
.card {
  display: inline-block;
}
.author {
  font-size: 8pt;
}
.date {
  font-size: 8pt;
}

</style>
