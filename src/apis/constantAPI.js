export const base_url = process.env.REACT_APP_API_URL;

export const auth_login = `${base_url}/user/login/`;
export const auth_refresh = `${base_url}/user/refresh/`;
export const auth_change_password = `${base_url}/user/change_password/`;

export const get_dropdown_department = `${base_url}/employee/department_list_dropdown/`;
export const get_dropdown_position = `${base_url}/employee/position_list_dropdown/`;
export const create_account_emp = `${base_url}/employee/create_employee_account/`;
export const get_profile_emp = `${base_url}/employee/get_employee_profile/`;
export const upload_avatar = `${base_url}/employee/upload_employee_avatar/`;
export const update_profile = `${base_url}/employee/update_employee_profile/`;
export const send_leave_request = `${base_url}/timesheet/send_leave_request/`;
export const send_overtime_request = `${base_url}/timesheet/send_overtime_request/`;
export const list_leave_request_manager = `${base_url}/timesheet/list_leave_requests_manager/`;
export const list_overtime_request_manager = `${base_url}/timesheet/list_overtime_requests_manager/`;
export const list_leave_request = `${base_url}/timesheet/list_leave_requests_employee/`;
export const list_overtime_request = `${base_url}/timesheet/list_overtime_requests_employee/`;
export const check_in = `${base_url}/timesheet/check_in/`;
export const check_in_overtime = `${base_url}/timesheet/check_in_overtime/`;
export const check_out = `${base_url}/timesheet/check_out/`;
export const check_out_overtime = `${base_url}/timesheet/check_out_overtime/`;
export const approve_leave_request = `${base_url}/timesheet/approve_leave_request/`;
export const approve_overtime_request = `${base_url}/timesheet/approve_overtime_request/`;
export const reject_leave_request = `${base_url}/timesheet/reject_leave_request/`;
export const reject_overtime_request = `${base_url}/timesheet/reject_overtime_request/`;
export const daily_timesheet = `${base_url}/timesheet/get_daily_timesheet_employee/`;
export const current_month_timesheet = `${base_url}/timesheet/get_current_month_timesheet_employee/`;