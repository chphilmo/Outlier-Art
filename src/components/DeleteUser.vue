<template>
    <div>
      <div>
       <b-button @click="confirmDelete" size="sm" variant="danger">
       <b-icon icon="trash"></b-icon>Delete Account
       </b-button>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          
        }
      },
      computed: {
      
      },
      methods: {
        confirmDelete() {
        
          this.$bvModal.msgBoxConfirm('Delete Account and Data?')
            .then(value => {
              if (value) {
                this.$emit('deleteUser')
      
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
      }
    }
  </script>