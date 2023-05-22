import ArticleService from '../services/article.service'

import EventBus from '../common/EventBus'

export const article = {
  namespaced: true,
  state: {
  articleArray: [],
  articleImgUrl: '',
  articleSectionImgUrl: '',
  sectionId: [],
  category: []
},
actions: {
  createArticle({ commit }, payload) {
    return ArticleService.create(payload).then(
      (data) => {
        commit('createArticle', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  createSection({ commit }, payload) {
    return ArticleService.createSection(payload).then(
      (data) => {
        commit('createSection', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  loadArticle({ commit }) {
    return ArticleService.loadArticle().then(
      (data) => {
        const obj = data
        const medias = []
        for (const key in obj) {
          medias.push({
            id: obj[key]._id,
            title: obj[key].title,
            section: obj[key].section,
            author: obj[key].author,
            date: obj[key].date,
            category: obj[key].category,
            imageUrl: obj[key].imageUrl,
            comment: obj[key].comment,
            like: obj[key].like,
            likes: obj[key].likes
          })
        }
        commit('fetchedArticle', medias)
        return Promise.resolve(data)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  },
  loadCategory({ commit }) {
    return ArticleService.loadCategory().then(
      (data) => {
        const obj = data
        const categories = []
        for (const key in obj) {
          categories.push(obj[key].name)
        }
        commit('fetchedCategories', categories)
        return Promise.resolve(data)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  },
  uploadImg({ commit }, payload) {
    return ArticleService.upload(payload).then(
      (data) => {
        commit('uploadImg', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  uploadSectionImg({ commit }, payload) {
    return ArticleService.upload(payload).then(
      (data) => {
        commit('uploadSectionImg', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  deleteArticle({ commit }, payload) {
    return ArticleService.delete(payload).then(
      data => {
        commit('deleteArticle', data);
        return Promise.resolve(data);
      },
      error => {
        console.log(error)
        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  commentArticle({ commit }, payload) {
    return ArticleService.comment(payload).then(
      (data) => {
        commit('commentArticle', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  likeArticle({ commit }, payload) {
    return ArticleService.like(payload).then(
      (data) => {
        commit('likeArticle', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  editArticle({ commit }, payload) {
    return ArticleService.edit(payload).then(
      (data) => {
        commit('editArticle', data)
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  editSection({ commit }, payload) {
    return ArticleService.editSection(payload).then(
      (data) => {
        commit('createSection', data)
        commit('setMessage', 'Section edited', { root: true })
        return Promise.resolve(data)
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
        commit('setMessage', error, { root: true })
        return Promise.reject(error)
      }
    )
  }
},
mutations: {
  createArticle(state, payload) {
    state.articleArray.push(payload)
    state.category.push(payload.category)
  },
  createSection(state, payload) {
    state.sectionId.push(payload.id)
  },
  fetchedArticle(state, payload) {
    state.articleArray = payload
  },
  fetchedCategories(state, payload) {
    state.category = payload
  },
  uploadImg(state, payload) {
    state.articleImgUrl = payload
  },
  uploadSectionImg(state, payload) {
    state.articleSectionImgUrl = payload
  },
  deleteArticle(state, payload) {
    const article = state.articleArray.find(article => {
      return article.id === payload.id
    })
    const index = state.articleArray.indexOf(article);
    state.articleArray.splice(index, 1);
  },
  commentArticle(state, payload) {
    const article = state.articleArray.find((article) => {
      return article.id === payload.articleId
    })
    if (!article.comments) {
      article.comments = []
    }
    const comment = {
      id: payload.id,
      section: payload.section,
      author: payload.author,
      date: payload.date
    }

    article.comment.push(comment)
  },
  likeArticle(state, payload) {
    const article = state.articleArray.find((article) => {
      return article.id === payload.id
    })
    article.like = payload.like
    article.likes = payload.likes
  },
  editArticle(state, payload) {
    const article = state.articleArray.find((article) => {
      return article.id === payload.id
    })
    article.title = payload.title
    article.section = payload.section
    article.category = payload.category
    article.imageUrl = payload.imageUrl
  }
},
getters: {
  loadedArticles(state) {
    // return state.loadedarticle.reverse()
    const sortedArray = [...state.articleArray]
    return sortedArray.sort((articleA, articleB) => {
      const da = new Date(articleA.date)
      const db = new Date(articleB.date)
      if (da === db) { return 0 }

      return da < db ? 1 : -1
    })
  },
  loadedArticle(state) {
    return (elementId) => {
      return state.articleArray.find((element) => {
        return element.id === elementId
      })
    }
  },
  loadedCategory(state) {
    const sortedCategory = [...state.category]
    return sortedCategory.sort()
  },
  loadedImgUrl(state) {
    // return state.loadedarticle.reverse()
    return state.articleImgUrl
  },
  loadedSectionImgUrl(state) {
    // return state.loadedarticle.reverse()
    return state.articleSectionImgUrl
  },
  sectionId(state) {
    // return state.loadedarticle.reverse()
    return state.sectionId
  }
}
}
