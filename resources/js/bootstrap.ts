import axios from 'axios';
window.axios = axios;

window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
window.axios.defaults.baseURL = window.location.protocol === 'https:' ? 'https://' + window.location.hostname : 'http://' + window.location.hostname;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
