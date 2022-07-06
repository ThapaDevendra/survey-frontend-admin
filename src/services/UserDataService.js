import http from '../http-common.js';

class UserDataService{
    getAllUsers(){
       return http.get('/users/');
    }

}

export default new UserDataService();