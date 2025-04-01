import React, { useEffect, useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("isAuthenticated");
        console.log(user);
        setIsAuthenticated(user);
    }, [])

    const handleLogout = () => {
        localStorage.setItem("isAuthenticated", "false");
        navigate("/login");
        window.dispatchEvent(new Event("storage"));
    }


    return (
        <div className='bg-primary text-lg font-medium text-primaryColor w-full h-[8vh] flex items-center justify-between px-7 shadow-2xl border-b-2'>
            <div className='flex items-center '>
                <h2 >Vehicle Fleet</h2>
            </div>

            <div className='relative cursor-pointer'>
                {/* <img src="" className="w-[2vmax] h-[2vmax]" alt="profile" /> */}
                <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <AccountCircleOutlinedIcon sx={{ width: "2vmax", height: "2vmax" }} />
                </div>
                <div className={`absolute z-50 shadow-lg text-primaryColor right-0 top-full w-[10vmax] divide-y divide-stroke overflow-hidden rounded-lg bg-white  ${dropdownOpen ? "block" : "hidden"}`}>
                    <p className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 ">Admin</p>
                    <button className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium  hover:bg-gray-50">

                        {isAuthenticated ? (
                            <span onClick={handleLogout} className="flex items-center gap-2">
                                <svg
                                    className='w-[1.5vmax]'
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.3 0.449997H8.47502C7.82502 0.449997 7.27502 0.999997 7.27502 1.65V3.375C7.27502 3.675 7.52502 3.925 7.82502 3.925C8.12502 3.925 8.40002 3.675 8.40002 3.375V1.625C8.40002 1.575 8.42502 1.55 8.47502 1.55H11.3C11.9 1.55 12.375 2.025 12.375 2.625V13.35C12.375 13.95 11.9 14.425 11.3 14.425H8.47502C8.42502 14.425 8.40002 14.4 8.40002 14.35V12.625C8.40002 12.325 8.15002 12.075 7.82502 12.075C7.50002 12.075 7.27502 12.325 7.27502 12.625V14.35C7.27502 15 7.82502 15.55 8.47502 15.55H11.3C12.525 15.55 13.5 14.55 13.5 13.35V2.65C13.5 1.425 12.5 0.449997 11.3 0.449997Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M4.39998 8.55H8.87498C9.17498 8.55 9.42498 8.3 9.42498 8C9.42498 7.7 9.17498 7.45 8.87498 7.45H4.42498L5.97498 5.875C6.19998 5.65 6.19998 5.3 5.97498 5.075C5.74998 4.85 5.39998 4.85 5.17498 5.075L2.67498 7.625C2.44998 7.85 2.44998 8.2 2.67498 8.425L5.17498 10.975C5.27498 11.075 5.42498 11.15 5.57498 11.15C5.72498 11.15 5.84998 11.1 5.97498 11C6.19998 10.775 6.19998 10.425 5.97498 10.2L4.39998 8.55Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Logout</span>) : (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="w-[1.5vmax]"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.3 0.449997H8.47502C7.82502 0.449997 7.27502 0.999997 7.27502 1.65V3.375C7.27502 3.675 7.52502 3.925 7.82502 3.925C8.12502 3.925 8.40002 3.675 8.40002 3.375V1.625C8.40002 1.575 8.42502 1.55 8.47502 1.55H11.3C11.9 1.55 12.375 2.025 12.375 2.625V13.35C12.375 13.95 11.9 14.425 11.3 14.425H8.47502C8.42502 14.425 8.40002 14.4 8.40002 14.35V12.625C8.40002 12.325 8.15002 12.075 7.82502 12.075C7.50002 12.075 7.27502 12.325 7.27502 12.625V14.35C7.27502 15 7.82502 15.55 8.47502 15.55H11.3C12.525 15.55 13.5 14.55 13.5 13.35V2.65C13.5 1.425 12.5 0.449997 11.3 0.449997Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M11.6 7.425H7.12498C6.82498 7.425 6.57498 7.675 6.57498 7.975C6.57498 8.275 6.82498 8.525 7.12498 8.525H11.575L10.025 10.1C9.79998 10.325 9.79998 10.675 10.025 10.9C10.25 11.125 10.6 11.125 10.825 10.9L13.325 8.35C13.55 8.125 13.55 7.775 13.325 7.55L10.825 5C10.725 4.9 10.575 4.825 10.425 4.825C10.275 4.825 10.15 4.875 10.025 4.975C9.79998 5.2 9.79998 5.55 10.025 5.775L11.6 7.425Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                Login </span>)}

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar