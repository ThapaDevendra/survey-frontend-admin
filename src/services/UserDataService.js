import http from '../http-common.js';

class UserDataService{
    getAllUser(){
       return http.get('/users/');
    }
}

export default new UserDataService();