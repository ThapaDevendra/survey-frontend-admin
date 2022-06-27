import axios from 'axios';

var baseUrl = '';
if(process.env.NODE_ENV === 'development')
{
    baseUrl = 'http://localhost:3000/api/';
}
else
{
    baseUrl = '/api/';
}

export default axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        crossDomain: true
    }
});