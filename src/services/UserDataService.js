import http from '../http-common.js';

class UserDataService{
    getAllUsers(){
       return http.get('/users/');
    }

    adminuserLogIn(data){
       return http.post('/users/login', data);
    }

    createAdminUser(data){
      return http.post('/users/', data)
    }
    update(id, data) {
      return http.post(`/users/${id}`, data);
    }
    delete(id) {
      return http.delete(`/users/${id}`);
    }
    get(id) {
      return http.get(`/users/${id}`);
    }
}

export default new UserDataService();