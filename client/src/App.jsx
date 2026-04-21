import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

const Home = lazy(() => import('./pages/Home'))
const Auth = lazy(() => import('./pages/Auth'))
const InterviewPage = lazy(() => import('./pages/InterviewPage'))
const InterviewHistory = lazy(() => import('./pages/InterviewHistory'))
const Pricing = lazy(() => import('./pages/Pricing'))
const InterviewReport = lazy(() => import('./pages/InterviewReport'))

export const ServerUrl  = import.meta.env.VITE_SERVER_URL || "https://ai-interview-r9dq.onrender.com"

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="glass-card rounded-2xl px-6 py-4 text-sm font-semibold text-[#24594b]">
      Preparing your experience...
    </div>
  </div>
)

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        const status = error?.response?.status
        if (status !== 401 && status !== 400) {
          console.log("Failed to fetch current user:", error?.response?.data || error?.message || error)
        }
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/interview' element={<InterviewPage/>}/>
        <Route path='/history' element={<InterviewHistory/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/report/:id' element={<InterviewReport/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
