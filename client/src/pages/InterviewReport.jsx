import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';

const Step3Report = lazy(() => import('../components/Step3Report'))

const ReportLoader = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="glass-card rounded-2xl px-6 py-4 text-sm font-semibold text-[#24594b]">
      Loading report viewer...
    </div>
  </div>
)

function InterviewReport() {
  const {id} = useParams()
  const [report,setReport] = useState(null);
   
  useEffect(()=>{
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id , {withCredentials:true})

        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReport()
  },[id])


    if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<ReportLoader />}>
      <Step3Report report={report}/>
    </Suspense>
  )
}

export default InterviewReport
