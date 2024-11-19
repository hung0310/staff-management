import axios from 'axios';

export const OAuth_Login = async (url_signin, username, password) => {
    try {
        const rsp = await axios.post(url_signin, {
            username: username,
            password: password
        });
        if (rsp.status === 200) {
            return rsp.data;
        }
    } catch(error) {
        console.error('Error Login:', error.message || error.response);
        throw error;
    }
};