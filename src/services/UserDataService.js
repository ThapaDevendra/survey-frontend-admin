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
}

export default new UserDataService();