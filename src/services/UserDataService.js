import http from '../http-common.js';
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies();

class UserDataService{
    
    getAllUsers(){
       return http.get('/users/', {headers: {Authorization:`Bearer ${cookies.get('token')}`}});
    }

    adminuserLogIn(data){
       return http.post('/users/login', data);
    }

    createAdminUser(data){
      return http.post('/users/', data, {headers: {Authorization: `Bearer ${cookies.get('token')}`}})
    }
    update(id, data) {
      return http.post(`/users/${id}`, data, {headers: {Authorization: `Bearer ${cookies.get('token')}`}});
    }
    delete(id) {
      return http.delete(`/users/${id}`, {headers: {Authorization: `Bearer ${cookies.get('token')}`}});
    }
    get(id) {
      return http.get(`/users/${id}`, {headers: {Authorization: `Bearer ${cookies.get('token')}`}});
    }
}

export default new UserDataService();