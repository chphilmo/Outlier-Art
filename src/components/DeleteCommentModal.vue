<template>
    <div>
      <div>
       <b-button @click="confirmDelete" size="sm" variant="danger">
       <b-icon icon="trash"></b-icon>
       </b-button>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      props: ['path', 'id'],
      data() {
        return {
          
        }
      },
      computed: {
      
      },
      methods: {
        confirmDelete() {
        
          this.$bvModal.msgBoxConfirm('Delete Comment?')
            .then(value => {
              if (value) {
            
                this.$store.dispatch(this.path, this.id)
              }
            })
            .catch(err => {
              console.log(err);
            })
        },
      }
    }
  </script>