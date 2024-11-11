import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../../assets/images/dashboard/group-manage.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faCubes,
    faFileCirclePlus,
    faHouse,
    faCircleUser,
    faGear,
    faBell,
    faBars,
    faAngleDown,
    faRightFromBracket,
    faClock,
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import styles from './SideBar.module.scss';
import HomePage from './components/home-page/HomePage';
import OvertimeRegistration from './components/overtime-registration/OvertimeRegistration';
import LeaveApplication from './components/leave-application/LeaveApplication';

const item_sidebar = [
    { id: 1, label: "Home Page", icon: faCubes, render_content: 'homepage' },
    { id: 2, label: "Overtime Registration", icon: faClock, render_content: 'overtime' },
    { id: 3, label: "Leave Application", icon: faPaperPlane, render_content: 'leave' },
    // {
    //     id: 6,
    //     label: "...",
    //     icon: faFileCirclePlus,
    //     render_content: '...',
    //     multiSelect: [
    //         {label: '...', content_render: '...'},
    //         {label: '...', content_render: '...'}
    //     ]
    // },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // navigate('/user-list');

    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);
    const [isShow, setShow] = useState(false);
    const [activeItem, setActiveItem] = useState(item_sidebar[0].label);
    const [navigateLink, setNavigateLink] = useState('Home Page');
    const [selectedContent, setSelectedContent] = useState(item_sidebar[0].render_content);
    const [expandedItems, setExpandedItems] = useState({});
    const [contentMultiChoice, setContentMultiChoice] = useState('');
    const [labelMultiChoice, setLabelMultiChoice] = useState('');

    const renderContent = () => {
        switch (selectedContent) {
            case 'homepage':
                return <HomePage />;
            case 'overtime':
                return <OvertimeRegistration />;
            case 'leave':
                return <LeaveApplication />;
            default:
                return <HomePage />;
        }
    };

    const handleShow = () => {
        setShow(!isShow);
    };

    const handleItemClick = (item) => {
        setActiveItem(item.label);
        setSelectedContent(item.render_content);
        if (item.multiSelect) {
            setExpandedItems(prev => ({
                ...prev,
                [item.id]: !prev[item.id]
            }));
        } else {
            setExpandedItems(prev => ({}));
        }

        if (item.label !== 'homepage') {
            setNavigateLink(item.label);
        } else {
            setNavigateLink('homepage');
        }
    };

    const handleClick_RenderExercise = (subItem) => {
        setContentMultiChoice(subItem.content_render);
        setLabelMultiChoice(subItem.label);
    }

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = item_sidebar.find(item => item.path === currentPath);
        if (activeItem) {
            setActiveItem(activeItem.label);
            setSelectedContent(activeItem.render_content);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isShow && 
                sidebarRef.current && 
                !sidebarRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        if (isShow) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); 
        };
    }, [isShow]);

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className={`${styles.view_wrapper}`}>
            <div className={`${styles.view}`}>
                <aside ref={sidebarRef} className={`${styles.nav_menu} ${isShow ? styles.open : ''}`}>
                    <div className={`${styles.logo}`}>
                        <img src={Logo} alt='logo' />
                        <span><strong>S</strong>ixnature</span>
                    </div>

                    <hr style={{ width: '100%', color: '#fff' }}></hr>

                    {item_sidebar.map((item) => (
                        <Link
                            href=''
                            key={item.id}
                            className={`${activeItem === item.label ? styles.active : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className={`${styles.main_a}`}>
                                <div className={`${styles.cus_multi}`}>
                                    <FontAwesomeIcon icon={item.icon} className='me-2' />
                                    <span>{item.label}</span>
                                </div>
                                <div className={`${styles.multi_choice_ico}`}>
                                    {item.multiSelect ?
                                        <FontAwesomeIcon icon={faAngleDown} />
                                        :
                                        <></>
                                    }
                                </div>
                            </div>

                            {expandedItems[item.id] && item.multiSelect && (
                                <div className={`${styles.board_multi}`}>
                                    {item.multiSelect.map((subItem, subIndex) => (
                                        <Link href='' className={`${styles.selected}`} key={subIndex} onClick={() => handleClick_RenderExercise(subItem)}>
                                            <span>{subItem.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </aside>

                <div className={`${styles.root_content}`}>
                    <header>
                        <div className={`${styles.header_nav}`}>
                            <div className={`${styles.direction}`}>
                                <div className={`${styles.ico_direction}`}>
                                    <FontAwesomeIcon icon={faHouse} className='me-2' />
                                    <span>/</span>
                                    <span className='ms-2'>{navigateLink}</span>
                                </div>
                                <span>{navigateLink} </span>
                                {labelMultiChoice ?
                                    <>
                                        <span> /</span>
                                        <span className='ms-2'>{labelMultiChoice}</span>
                                    </>
                                    :
                                    <></>
                                }
                            </div>

                            <div className={`${styles.function_nav}`}>
                                <div className={`${styles.custom_ico}`}>
                                    <FontAwesomeIcon icon={faBell} />
                                    <FontAwesomeIcon ref={buttonRef} icon={faBars} className={`${styles.ico_bars}`} onClick={handleShow} />
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout}/>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div>
                        <main>
                            {renderContent()}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;