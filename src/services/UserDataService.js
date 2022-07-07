import http from '../http-common.js';

class UserDataService{
    getAllUsers(){
       return http.get('/users/');
    }
    delete(id) {
        return http.delete(`/users/${id}`);
    }

}

export default new UserDataService();