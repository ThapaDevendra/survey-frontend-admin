<template>
<SAdminDashboardVue/>
  <v-btn class="btn btn-primary" @click="addNewAdmin">Add New Admin</v-btn>
</template>


<script >
import SAdminDashboardVue from '../components/SAdminDashboard.vue'
export default{
  data(){
    return{}
  },
  components:{
    SAdminDashboardVue
  },

  methods:{
    async addNewAdmin(){
      await this.$router.push({name: 'addAdmin'});
    }
  }
}

</script>