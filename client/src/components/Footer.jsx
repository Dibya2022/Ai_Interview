import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand'

function Footer() {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center px-4 pb-10 py-4 pt-10'>
      <div className='w-full max-w-6xl rounded-[30px] overflow-hidden shadow-[0_24px_60px_rgba(50,36,30,0.22)] border border-[#e8cfc4]'>
        <div className='bg-linear-to-br from-[#1f2f46] via-[#284664] to-[#1a2c40] px-6 sm:px-10 pt-10 pb-8'>
          <div className='grid lg:grid-cols-[1.2fr_0.8fr_0.8fr] gap-8'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='bg-[#ff6d47] text-white p-2.5 rounded-lg'><BsRobot size={16} /></div>
                <h2 className='font-semibold text-white text-xl'>{BRAND_NAME}</h2>
              </div>
              <p className='text-[#c5d6ea] text-sm max-w-md'>
                {BRAND_TAGLINE} AI-powered interview preparation platform designed to improve communication skills,
                technical depth, and professional confidence.
              </p>

              <div className='mt-6 flex flex-wrap items-center gap-3'>
                <button onClick={() => navigate('/interview')} className='primary-btn px-6 py-2.5 text-sm'>Start Practice</button>
                <button onClick={() => navigate('/pricing')} className='secondary-btn px-6 py-2.5 text-sm'>Explore Plans</button>
              </div>
            </div>

            <div>
              <h3 className='text-white font-semibold mb-3'>Quick Links</h3>
              <div className='space-y-2 text-sm'>
                <button onClick={() => navigate('/')} className='text-[#d2dff0] hover:text-white block'>Home</button>
                <button onClick={() => navigate('/interview')} className='text-[#d2dff0] hover:text-white block'>Start Interview</button>
                <button onClick={() => navigate('/history')} className='text-[#d2dff0] hover:text-white block'>Interview History</button>
                <button onClick={() => navigate('/pricing')} className='text-[#d2dff0] hover:text-white block'>Pricing</button>
              </div>
            </div>

            <div>
              <h3 className='text-white font-semibold mb-3'>Join Community</h3>
              <p className='text-[#c5d6ea] text-sm mb-4'>Get interview tips, mock questions, and strategy notes every week.</p>
              <div className='flex items-center gap-2'>
                {[FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube].map((Icon, index) => (
                  <button key={index} className='w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition'>
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#ffece4] px-6 sm:px-10 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#7c4a3f]'>
          <p>Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Built for modern career growth and confident interviews.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
