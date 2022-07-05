import http from '../http-common.js';

class UserDataService{
    getAllUser(){
       return http.get('/users/');
    }

    userLogIn(data){
       return http.post('/users/login', data);
    }
}

export default new UserDataService();