import * as url from './constantAPI';
import { apiService } from '../utils/interceptorAxios';

export const OAuth_Login = (username, password) => {
    return apiService.post(url.auth_login, { username, password });
}