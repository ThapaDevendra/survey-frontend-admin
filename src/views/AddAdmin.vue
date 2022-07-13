<template>
    <v-container fluid>
        <v-layout align-center>
        </v-layout>
        <v-card class='mx-auto' width="800">
            <v-card-text v-if="!submitted">
                <v-form>
                    <v-text-field v-model="user.username" name="username" type="text" label="Full Name" required></v-text-field>
                    <v-text-field v-model="user.email" label="E-mail" required>
                    </v-text-field>
                    <v-text-field v-model="user.password" label="Default Password" required></v-text-field>
                    <v-text-field v-model="user.role" :items="items" label="User Role" required></v-text-field>
                    <h4 style='color:red'>{{message}}</h4>
                    <v-btn class="mr-4 btn-primary" @click="register">
                        register
                    </v-btn>
                    <v-btn class="mr-4 btn-secondary" @click="clear">
                        clear
                    </v-btn>
                    <v-btn class="mr-4 btn-danger" @click="goAdminDashboard">
                        Cancel
                    </v-btn>
                </v-form>
            </v-card-text>
            <v-card-text v-else>
                <h4>Admin-user successfully created !!</h4>
                <button class="btn btn-primary" @click="newAdmin" style="margin-right:16px">Add New Admin</button>
                <button class="btn btn-secondary" @click="goAdminDashboard" style="margin-left:16px">Return</button>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import UserDataService from '../services/UserDataService'
export default {
    name: 'addAdmin',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: 'Survey',
                role: 'Admin'
            },
            adminUsers:[],
            submitted: false,
            message: ''
        }
    },
    methods: {
        getAllAdminUsers(){
            UserDataService.getAllUsers().then(res => {
                this.adminUsers = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        refresh() {
            this.user.username = '',
            this.user.email = '',
            this.message = '',
            this.submitted = false
        },
        clear(){
            this.refresh();
        },
        async register(){
            var newAdmin = {username: this.user.username, role: this.user.role, email: this.user.email, password: this.user.password}
            const value = await this.adminUsers.filter(obj => obj.email.toLowerCase() === newAdmin.email.toLowerCase());
            if(value.length > 0){
                this.message = 'Email already exist !!'
            }
            else{
                UserDataService.createAdminUser(newAdmin).then(res => {
                    this.submitted = true;
                })
            }
        },
        goAdminDashboard(){
            this.$router.push({name: 'adminList'})
        },
        newAdmin(){
            this.refresh();
            this.getAllAdminUsers();
            
        },
       
    }, mounted(){
            this.getAllAdminUsers();
        }
}


</script>

<style>
.v-field_field {
    align-items: center;
}
</style>