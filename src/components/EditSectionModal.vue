<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing2>Edit Section</b-button>
        <div class="form-group">
            <label for="selecsection">Select Section</label>
            <b-form-select v-model="selected" :options="options" @change="displaySection()"></b-form-select>

        </div>

        <b-modal id="modal-prevent-closing2" ref="modal" title="Submit Article Section" @show="resetModal2"
            @hidden="resetModal2" @ok="handleOk2">
            <form ref="form" @submit.stop.prevent="handleSubmit2">
                <b-form-group label="Title" label-for="title-input">
                    <b-form-input id="title-input" v-model="title" required></b-form-input>
                </b-form-group>

                <b-form-group label="Content" label-for="content-input">
                    <b-form-textarea id="content" v-model="content" rows="3" max-rows="6"></b-form-textarea>
                </b-form-group>

                <b-form-group label="Image" label-for="image-input">
                    <b-button variant="primary" @click="onPickFile">Upload image </b-button>
                    <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">

                    <img :src="imageUrl" height="200">

                    <img :src="imgUrl.imageUrl" height="200">
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>
  
<script>

import { mapGetters } from 'vuex'

export default {
    props: ['article'],
    data() {
        return {
            title: '',
            content: '',
            image: null,
            imageUrl: '',
            selected: null,
            options: [],
        }
    },
    computed: {
        ...mapGetters('article.module', {
            loadedImg: 'loadedSectionImgUrl'
        }),
        imgUrl() {
            return this.loadedImg
        },


    },
    mounted() {
        this.loadSection()
        this.displaySection()
    },
    methods: {
        loadSection() {
            this.article.section.forEach(section => {
                this.options.push({
                    value: section._id,
                    text: section.title
                })
            })
            this.selected = this.options[0].value
        
        },

        displaySection() {
            this.section = this.article.section.find(section => section._id === this.selected)
            this.title = this.section.title
            this.content = this.section.content
            this.imageUrl = this.section.imageUrl
        },

        resetModal2() {
            
        },
        handleOk2(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit2()
        },
        handleSubmit2() {
            // Exit when the form isn't valid
            if (this.content === '') {
                return
            }

            const sectionData = {
                id: this.selected,
                title: this.title,
                content: this.content,
                imageUrl: this.imgUrl.imageUrl || this.imageUrl,
            }
            this.$emit('updateSection', sectionData)
            this.$store.dispatch('article.module/editSection', sectionData)

            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing2')
            })
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
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
            this.$store.dispatch('article.module/uploadSectionImg', files[0])

        },
    }
}
</script>