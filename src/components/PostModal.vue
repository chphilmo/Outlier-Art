<template>
    <div>
        <b-button v-b-modal.modal1-prevent-closing>Create Media</b-button>

        <b-modal size="xl" id="modal1-prevent-closing" ref="modal" title="Submit a media post" @show="resetModal"
            @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <!-- Horizontal b-card media form post -->
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col lg="6" md="6" sm="6" xs="12">
                            <b-card-img :src="imageUrl" alt="Image" class="rounded-0"></b-card-img>
                            <div>
                                <h5>Uploaded image</h5>
                                <div class="add">{{ imgUrl.imageUrl }}</div>
                            </div>
                            <div class="mt-3">

                                <h5>Dominant colors</h5>
                            </div>

                            <div>
                                <b-row class="swatch__container">
                                    <b-col cols="3" v-for="(color, index) in display_palette" :key="index"
                                        class="swatch__wrapper">
                                        <div :style="{ backgroundColor: color }" class="swatch"></div>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                        <b-col lg="6" md="6" sm="6" xs="12">
                            <b-card-body title="Content">

                                <div class="form-group">
                                    <p>Title</p>
                                    <input v-model="media.title" type="text" class="form-control" name="title" />
                                </div>

                                <div class="form-group">
                                    <p>Content</p>
                                    <b-form-textarea id="content" v-model="media.content" placeholder="..." rows="3"
                                        max-rows="6"></b-form-textarea>
                                </div>

                                <div class="form-group mt-2">
                                    <b-button variant="primary" @click="onPickFile">Upload image </b-button>
                                    <b-button raised class="primary" @click="onGetColors">Get colors </b-button>
                                    <input type="file" style="display: none" ref="fileInput" accept="image/*"
                                        @change="onFilePicked">

                                </div>



                                <div>
                                    <label for="footprint">Footprint</label>
                                    <b-form-tags input-id="tags-basic" v-model="media.footprint"></b-form-tags>
                                </div>

                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>

            </form>
        </b-modal>
    </div>
</template>
  
<script>

import * as Vibrant from 'node-vibrant';
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            loading: false,
            message: '',
            media: {
                title: '',
                content: '',
                footprint: ['emotion'],
            },
            image: null,
            imageUrl: '',
            palette: [],
            display_palette: [],
            name_palette: [],
        }
    },
    computed: {
        ...mapState('auth.module', {
            currentUser: (state) => state.user
        }),
        ...mapGetters('media.module', {
            loadedImg: 'loadedImgUrl'
        }),
        imgUrl() {
            return this.loadedImg
        }
    },
    methods: {
        onGetColors() {
            this.getPalette(this.imageUrl)
        },
        getPalette(imageSrc) {
            this.imageSrc = imageSrc
            Vibrant.from(imageSrc).maxColorCount(200).getPalette().then((palette) => {
                const colors = []
                const hexcolors = []
                const colorNames = []
                let number = 0
                for (let color in palette) {
                    number = number + 1
                    // get hsl values
                    const hsl = palette[color].hsl
                    const hex = palette[color].hex
                    // get color name
                    const name = palette[color].getBodyTextColor()

                    colors.push(hsl)
                    hexcolors.push(hex)
                    colorNames.push(name)
                }
                this.palette = colors
                this.display_palette = hexcolors
                this.name_palette = colorNames
            });
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
            this.$store.dispatch('media.module/uploadImg', files[0])

        },

        resetModal() {
            this.media.title = ''
            this.media.content = ''
            this.media.footprint = ['']
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Exit when the form isn't valid
            this.loading = true
            if (!this.media.title && !this.media.content) {
                this.loading = false;
                this.message = 'Please fill all fields';
                return
            }

            const paletteData = [];


            this.palette.forEach((color, i) => {
                paletteData.push({
                    name: this.name_palette[i],
                    hex: this.display_palette[i],
                    hsl: this.palette[i],
                })
            })

            const mediaData = {
                title: this.media.title,
                content: this.media.content,
                footprint: this.media.footprint,
                imageUrl: this.imgUrl.imageUrl,
                palette: paletteData,
            }

            this.$emit('createMedia', mediaData)

            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
}
</script>
<style scoped>
.swatch {
    display: inline-block;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    margin-bottom: 1em;
    transition: background .3s ease;
}

.swatch__wrapper {
    display: inline-block;
    width: 100%;
    list-style: none;
    margin-bottom: 1.4em;
}

.swatch__container {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.add {
    font-size: 10pt;
}
</style>