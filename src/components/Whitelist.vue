<template>
    <div>
      <b-button variant="nature1" v-b-modal.modal-prevent-closing2>
        Whitelist
      </b-button>
  
      <b-modal id="modal-prevent-closing2" ref="modal" title="Whitelist Address" @show="resetModal"
        @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          
          <b-form-group label="Address" label-for="value-input">
            <b-form-input id="value-input" v-model="address" required></b-form-input>
          </b-form-group>
  
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  
  import { mapState } from 'vuex';
  
  export default {
    name: 'SetValue',
    props: ['address'],
    data() {
      return {
        value2: ''
      }
    },
    computed: {
      ...mapState('auth.module', {
        currentUser: (state) => state.user
      }),
  
    },
    methods: {
  
      resetModal() {
      
         
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (this.address === '') {
          return
        }
  
        this.$emit('whitelistAddress', this.address)
  
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing2')
        })
      },
      
    }
  }
  </script>