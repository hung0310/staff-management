import * as url from './constantAPI';
import { apiService } from '../utils/interceptorAxios';

export const OAuth_Login = (username, password) => {
    return apiService.post(url.auth_login, { username, password });
}

export const OAuth_ChangePassword = (data) => {
    return apiService.put(url.change_password, data);
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

export const Delete_Account_Emp = (data) => {
    return apiService.delete(`${url.delete_account_emp}?employee_id=${data}`);
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

export const Send_Overtime_Request = (data) => {
    return apiService.post(url.send_overtime_request, data);
}

export const List_Leave_Request_Manager = (page) => {
    return apiService.get(`${url.list_leave_request_manager}?page=${page}`);
}

export const List_Overtime_Request_Manager = (page) => {
    return apiService.get(`${url.list_overtime_request_manager}?page=${page}`);
}

export const List_Leave_Request = (page) => {
    return apiService.get(`${url.list_leave_request}?page=${page}`);
}

export const List_Overtime_Request = (page) => {
    return apiService.get(`${url.list_overtime_request}?page=${page}`);
}

export const CheckIn = (data) => {
    return apiService.post(url.check_in, data);
}

export const CheckInOvertime = () => {
    return apiService.post(url.check_in_overtime);
}

export const CheckOut = (data) => {
    return apiService.post(url.check_out, data);
}

export const CheckOutOvertime = () => {
    return apiService.post(url.check_out_overtime);
}

export const Approve_Leave_Request = (data) => {
    return apiService.post(url.approve_leave_request, data);
}

export const Approve_Overtime_Request = (data) => {
    return apiService.post(url.approve_overtime_request, data);
}

export const Reject_Leave_Request = (data) => {
    return apiService.post(url.reject_leave_request, data);
}

export const Reject_Overtime_Request = (data) => {
    return apiService.post(url.reject_overtime_request, data);
}

export const Get_Daily_Timesheet = () => {
    return apiService.get(url.daily_timesheet);
}

export const Get_Current_Month_Timesheet = (page) => {
    return apiService.get(`${url.current_month_timesheet}?page=${page}`);
}

export const Get_List_Employee = (department, page) => {
    return apiService.get(`${url.list_employee}?department=${department}&page=${page}`);
}

export const Get_Tracking_Time_Employee = (department, page) => {
    return apiService.get(`${url.tracking_time_emp}?department=${department}&page=${page}`);
}

export const Get_Salary_Month = (department, month, year, page) => {
    return apiService.get(`${url.salary_month}?department=${department}&month=${month}&year=${year}&page=${page}`);
}

export const Get_Leave_Count = () => {
    return apiService.get(url.leave_count);
}