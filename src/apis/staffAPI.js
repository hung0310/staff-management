import * as url from './constantAPI';
import { apiService } from '../utils/interceptorAxios';

export const OAuth_Login = (username, password) => {
    return apiService.post(url.auth_login, { username, password });
}

export const Get_DropDown_Department = () => {
    return apiService.get(url.get_dropdown_department);
}

export const Get_DropDown_Position = (accessToken) => {
    return apiService.get(url.get_dropdown_position, accessToken);
}

export const Create_Account_Emp = (data) => {
    return apiService.post(url.create_account_emp, data);
}

export const Get_Profile_Emp = () => {
    return apiService.get(url.get_profile_emp);
}

export const Upload_Avatar_Emp = (file) => {
    return apiService.post_form(url.upload_avatar, file);
}

export const Update_Profile = (data) => {
    return apiService.post(url.update_profile, data);
}

export const Send_Leave_Request = (data) => {
    return apiService.post(url.send_leave_request, data);
}

export const List_Leave_Request = (page) => {
    return apiService.get(`${url.list_leave_request}?page=${page}`);
}