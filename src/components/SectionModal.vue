<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Create Section</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Article Section"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Content"
          label-for="content-input"
  
        >
          <b-form-textarea
          id="content"
          v-model="content"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        </b-form-group>

        <b-form-group
          label="Image"
          label-for="image-input"
        >
        <b-button variant="primary" @click="onPickFile">Upload image </b-button>
        <input 
          type="file" 
          style="display: none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">

        <img :src="imageUrl" height="200">

        <div class="add">{{ imgUrl.ipfsHash }}</div>
      </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        title: '',
        content: '',
        image: null,
        imageUrl: ''
      }
    },
    computed: {
      ...mapGetters('article', {
      loadedImg: 'loadedSectionImgUrl'
      }),
      imgUrl() {
      return this.loadedImg
      },

      
    },
    methods: {
      
      resetModal() {
        this.title = '',
        this.content = '',
        this.imageUrl = ''
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (this.content === '') {
          return
        }
        
        const sectionData = {
          title: this.title, 
          content: this.content,
          imageUrl: "https://ipfs.io/ipfs/" + this.imgUrl.ipfsHash
        }
        this.$emit('logSection', sectionData)
        this.$store.dispatch('article/createSection', sectionData)

        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
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
        this.$store.dispatch('article/uploadSectionImg', files[0])
  
      },
    }
  }
</script>