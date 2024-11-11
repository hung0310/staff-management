import React, { useState } from 'react';
import styles from './Salary.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ButtonExport from '../../../../../components/ButtonExport/ButtonExport';

const mockDatas = [
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', regular: '240', overtime: '80', total_hour: '320', day_off: '0', bonuses: '300', salary: '3000'},
    {em_id: '#EMP : 00002', em_item: 'Hành chính, nhân sự', em_name: 'Nguyễn Văn B', regular: '240', overtime: '80', total_hour: '320', day_off: '0', bonuses: '300', salary: '3000'},
    {em_id: '#EMP : 00003', em_item: 'Tài chính, kế toán', em_name: 'Nguyễn Văn C', regular: '240', overtime: '80', total_hour: '320', day_off: '0', bonuses: '300', salary: '3000'},
    {em_id: '#EMP : 00004', em_item: 'Sale', em_name: 'Nguyễn Văn D', regular: '240', overtime: '80', total_hour: '320', day_off: '0', bonuses: '300', salary: '3000'},
    {em_id: '#EMP : 00005', em_item: 'Kỹ Thuật, sản xuất', em_name: 'Nguyễn Văn E', regular: '240', overtime: '80', total_hour: '320', day_off: '0', bonuses: '300', salary: '3000'},
]

const Salary = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage);

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>SALARY</h3>
                    <ButtonExport start={3} end={7} totalCol={8} totalCheck={true} nameFile={'Salary_Report'} />
                </div>
                <hr style={{ backgroundColor: ''}}></hr>
                <div className={`${styles.table} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr>
                                    <th className={`${styles.id_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMPLOYEE ID</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.item_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ITEM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMPLOYEE NAME</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.regular_start_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>REGULAR HOURS</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.overtime_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>OVERTIME HOUR</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_hour_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TOTAL WORKED HOUR</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.day_off_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>DAYS OFF</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.bonuses_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>BONUSES</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TOTAL WAGE</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {mockDatas.length > 0 ?
                            <>
                                {mockDatas.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.em_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_item}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.regular}</span>
                                                </td>
                                                <td>
                                                    <span>{item.overtime}</span>
                                                </td>
                                                <td>
                                                    <span>{item.total_hour}</span>
                                                </td>
                                                <td>
                                                    <span>{item.day_off}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.bonuses}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.salary}</span>
                                                </td>                                      
                                            </tr>
                                        </tbody> 
                                    )                               
                                })}
                                <tfoot>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </>
                            :
                                <tbody>
                                    <td colSpan={8} className='text-center'>
                                        <NoResult/>
                                    </td>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
            <div className={`${styles.paginnate} mt-5`}>
                <PaginationComponent/>
            </div>
        </div>
    );
};

export default Salary;