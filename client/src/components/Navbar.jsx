import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className='w-full max-w-6xl glass-card rounded-[26px] px-5 sm:px-8 py-4 flex justify-between items-center relative'>
                <div onClick={() => navigate("/")} className='flex items-center gap-3 cursor-pointer'>
                    <div className='bg-[#ff6d47] text-white p-2.5 rounded-xl shadow-md'>
                        <BsRobot size={18} />
                    </div>
                    <div>
                        <h1 className='font-semibold text-base sm:text-lg'>{BRAND_NAME}</h1>
                        <p className='text-xs text-slate-500 hidden sm:block'>{BRAND_TAGLINE}</p>
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-3 text-sm'>
                    <button onClick={() => navigate("/interview")} className='chip'>Start</button>
                    <button onClick={() => navigate("/history")} className='chip'>History</button>
                    <button onClick={() => navigate("/pricing")} className='chip'>Pricing</button>
                </div>

                <div className='flex items-center gap-3 relative'>
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }} className='flex items-center gap-2 bg-[#fff0ea] border border-[#f3d1c4] px-3 sm:px-4 py-2 rounded-full text-sm font-semibold text-[#8c4f3e] hover:bg-[#ffe6dc] transition'>
                            <BsCoin size={18} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                                <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                                <button onClick={() => navigate("/pricing")} className='w-full primary-btn py-2.5 text-sm'>Buy more credits</button>
                            </div>
                        )}
                    </div>

                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }} className='w-9 h-9 sm:w-10 sm:h-10 bg-[#17364f] text-white rounded-full flex items-center justify-center font-semibold'>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}

                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-52 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                                <p className='text-md text-[#ff6d47] font-semibold mb-2'>{userData?.name}</p>

                                <button onClick={() => navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>Interview History</button>
                                <button onClick={handleLogout}
                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>

            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        </div>
    )
}

export default Navbar
