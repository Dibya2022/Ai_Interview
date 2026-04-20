import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsLightningCharge,
  BsCheck2Circle,
  BsStars
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

const rolePacks = [
  { role: "Frontend", level: "React + JS", tone: "UI focused with debugging rounds" },
  { role: "Backend", level: "Node + APIs", tone: "System and database depth" },
  { role: "HR", level: "Behavioral", tone: "Communication and confidence scoring" },
];

const weeklyPlan = [
  "Day 1: Baseline technical interview",
  "Day 2: Clarity and communication drill",
  "Day 3: Resume project storytelling",
  "Day 4: Timed pressure simulation",
  "Day 5: HR behavior and STAR method",
  "Day 6: Weak area correction session",
  "Day 7: Full mock + PDF report review",
];

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  const readinessScore = Math.min(98, 40 + Math.round((userData?.credits || 0) / 10));

  const requireAuthThen = (cb) => {
    if (!userData) {
      setShowAuth(true)
      return;
    }
    cb();
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <div className='flex-1 px-5 sm:px-6 py-12 sm:py-16'>
        <div className='max-w-6xl mx-auto'>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className='hero-gradient rounded-[30px] border border-[#dbe8e3] px-5 sm:px-10 py-9 sm:py-12 shadow-[0_20px_50px_rgba(19,52,43,0.12)] mb-14'>

            <div className='flex justify-center mb-6'>
              <div className='bg-white/80 text-[#2a5d4f] text-sm px-4 py-2 rounded-full flex items-center gap-2 border border-[#d5e6e0]'>
                <HiSparkles size={16} className="text-green-600" />
                AI Powered Smart Interview Platform
              </div>
            </div>

            <div className='grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center'>
              <div>
                <h1 className='text-4xl md:text-6xl font-semibold leading-tight'>
                  Practice Interviews With
                  <span className='relative inline-block mt-2'>
                    <span className='bg-[#d8f8ea] text-[#0f7f67] px-5 py-1 rounded-full'>
                      AI Intelligence
                    </span>
                  </span>
                </h1>

                <p className='text-[#4c635b] mt-6 max-w-2xl text-lg'>
                  Role-based mock interviews with dynamic follow-ups, adaptive difficulty,
                  live answer feedback, and progress reports that tell you exactly what to improve next.
                </p>

                <div className='flex flex-wrap gap-3 mt-7'>
                  <span className='chip'>Live Feedback</span>
                  <span className='chip'>Weekly Plan</span>
                  <span className='chip'>Role Packs</span>
                  <span className='chip'>PDF Reports</span>
                </div>

                <div className='flex flex-wrap gap-4 mt-9'>
                  <motion.button
                    onClick={() => requireAuthThen(() => navigate("/interview"))}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='primary-btn px-10 py-3 text-base'>
                    Start Interview
                  </motion.button>

                  <motion.button
                    onClick={() => requireAuthThen(() => navigate("/history"))}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className='secondary-btn px-10 py-3 text-base'>
                    View History
                  </motion.button>
                </div>
              </div>

              <div className='glass-card rounded-3xl p-6 sm:p-7'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <BsLightningCharge className='text-[#0f7f67]' />
                  Interview Readiness Score
                </h3>

                <div className='mt-5 rounded-2xl border border-[#d4e8e1] p-5 bg-white'>
                  <div className='flex items-end justify-between mb-2'>
                    <p className='text-sm text-slate-500'>Current readiness</p>
                    <p className='text-4xl font-bold text-[#0f7f67]'>{readinessScore}%</p>
                  </div>

                  <div className='h-3 rounded-full bg-[#e7f2ee] overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${readinessScore}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className='h-full bg-linear-to-r from-[#0c7f66] to-[#19a685]'
                    />
                  </div>

                  <div className='mt-4 text-sm text-slate-600 space-y-2'>
                    <p className='flex items-center gap-2'><BsCheck2Circle className='text-[#0f7f67]' />Credits available: {userData?.credits || 0}</p>
                    <p className='flex items-center gap-2'><BsCheck2Circle className='text-[#0f7f67]' />Recommended: 3 interviews this week</p>
                    <p className='flex items-center gap-2'><BsCheck2Circle className='text-[#0f7f67]' />Best next mode: Technical</p>
                  </div>
                </div>

                <button onClick={() => navigate('/pricing')} className='w-full mt-5 secondary-btn py-3'>Boost Credits</button>
              </div>
            </div>
          </motion.section>

          <section className='grid lg:grid-cols-2 gap-6 mb-28'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='glass-card rounded-3xl p-7'>
              <h2 className='section-title mb-5'>Role-Specific Interview Packs</h2>
              <p className='text-slate-600 mb-5'>Choose focused question packs and practice with your target role style.</p>

              <div className='space-y-3'>
                {rolePacks.map((item) => (
                  <div key={item.role} className='rounded-2xl border border-[#d7e8e2] bg-white p-4 flex items-center justify-between gap-3'>
                    <div>
                      <p className='font-semibold text-[#173e34]'>{item.role}</p>
                      <p className='text-sm text-slate-500'>{item.level}</p>
                    </div>
                    <span className='text-xs font-semibold text-[#0f7f67] bg-[#e9f8f2] rounded-full px-3 py-1'>{item.tone}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => requireAuthThen(() => navigate('/interview'))} className='secondary-btn mt-6 px-6 py-2.5'>Open Interview Setup</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='glass-card rounded-3xl p-7'>
              <h2 className='section-title mb-5'>Your Personalized 7-Day Plan</h2>
              <p className='text-slate-600 mb-5'>A practical schedule that turns AI feedback into daily improvement.</p>

              <div className='space-y-2'>
                {weeklyPlan.map((day) => (
                  <div key={day} className='flex gap-3 text-sm items-center text-[#2f5f52] bg-white border border-[#d7e8e2] rounded-xl px-4 py-2.5'>
                    <BsStars className='text-[#ff8a3d] shrink-0' />
                    <span>{day}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => requireAuthThen(() => navigate('/history'))} className='primary-btn mt-6 px-6 py-2.5'>Track My Progress</button>
            </motion.div>
          </section>

          <div className='flex flex-col md:flex-row justify-center items-center gap-8 mb-28'>
            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Setup",
                  desc: "AI adjusts question style and depth based on your target profile."
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Voice + Typed Interview",
                  desc: "Speak naturally and get instant AI feedback after each answer."
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timed Real Simulation",
                  desc: "Practice under pressure and build consistency across sessions."
                }
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ rotate: 0, scale: 1.03 }}

                  className={`relative glass-card rounded-3xl hover:border-green-500 p-9 w-80 max-w-[90%] transition-all duration-300 ${index === 0 ? "-rotate-3" : ""} ${index === 1 ? "rotate-2 md:-mt-6" : ""} ${index === 2 ? "-rotate-2" : ""}`}
                >

                  <div className='absolute -top-7 left-1/2 -translate-x-1/2 bg-white border-2 border-[#0f7f67] text-[#0f7f67] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg'>
                    {item.icon}
                  </div>
                  <div className='pt-8 text-center'>
                    <div className='text-xs text-[#0f7f67] font-semibold mb-2 tracking-wider'>{item.step}</div>
                    <h3 className='font-semibold mb-3 text-lg'>{item.title}</h3>
                    <p className='text-sm text-slate-600 leading-relaxed'>{item.desc}</p>
                  </div>

                </motion.div>
              ))
            }
          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='section-title text-center mb-16'>
              Advanced AI <span className="text-[#0f7f67]">Capabilities</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy and confidence with practical feedback."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume-Based Interview",
                    desc: "Generates project-aware questions using your uploaded resume context."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Get strengths, weak areas and direct action points after every interview."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "History & Analytics",
                    desc: "Track score trends and measure improvements across multiple attempts."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className='glass-card rounded-3xl p-7 sm:p-8 transition-all'>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-56' />
                      </div>

                      <div className='w-full md:w-1/2'>
                        <div className='bg-[#e7faf3] text-[#0f7f67] w-12 h-12 rounded-xl flex items-center justify-center mb-5'>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-3 text-xl'>{item.title}</h3>
                        <p className='text-slate-600 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>

                  </motion.div>
                ))
              }
            </div>

          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='section-title text-center mb-16'>
              Multiple Interview <span className="text-[#0f7f67]">Modes</span>

            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication-based evaluation with practical feedback."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on your selected role and stack."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Voice and answer quality signals to improve confidence in real interviews."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock more sessions and maintain your daily preparation streak."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="glass-card rounded-3xl p-8 transition-all">

                    <div className='flex items-center justify-between gap-6'>
                      <div className="w-1/2">
                        <h3 className="font-semibold text-xl mb-3">
                          {mode.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>



                    </div>


                  </motion.div>
                ))
              }
            </div>


          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />

    </div>
  )
}

export default Home
