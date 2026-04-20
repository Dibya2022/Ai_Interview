import React, { lazy, Suspense } from 'react'
import { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'

const Step3Report = lazy(() => import('../components/Step3Report'))

const ReportLoader = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="glass-card rounded-2xl px-6 py-4 text-sm font-semibold text-[#24594b]">
      Loading performance report...
    </div>
  </div>
)

function InterviewPage() {
    const [step,setStep] = useState(1)
    const [interviewData,setInterviewData] = useState(null)

  return (
    <div className='min-h-screen'>
        {step===1 && (
            <Step1SetUp onStart={(data)=>{
                setInterviewData(data);
            setStep(2)}}/>
        )}

         {step===2 && (
            <Step2Interview interviewData={interviewData}
            onFinish={(report)=>{setInterviewData(report);
                setStep(3)
            }}
            />
        )}

          {step===3 && (
            <Suspense fallback={<ReportLoader />}>
                <Step3Report report={interviewData}/>
            </Suspense>
        )}

      
    </div>
  )
}

export default InterviewPage
