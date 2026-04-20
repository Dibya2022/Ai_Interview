import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { BRAND_NAME } from '../constants/brand';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];



  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      

      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: BRAND_NAME,
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

      },
      theme:{
        color: "#ff6d47",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
     console.log(error)
     setLoadingPlan(null);
    }
  }



  return (
    <div className='min-h-screen py-14 px-5 sm:px-6'>

      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto glass-card rounded-2xl px-5 sm:px-8 py-6 mb-8'>
        <h2 className='text-lg font-semibold text-[#1b4036] mb-4'>Why paid plans help you get better results</h2>
        <div className='grid md:grid-cols-3 gap-4 text-sm text-slate-600'>
          <p className='bg-white border border-[#d2e6df] rounded-xl p-4'>More attempts means better speaking clarity and lower interview anxiety.</p>
          <p className='bg-white border border-[#d2e6df] rounded-xl p-4'>Detailed report feedback helps you improve weak areas quickly.</p>
          <p className='bg-white border border-[#d2e6df] rounded-xl p-4'>Analytics and history tracking show measurable progress over time.</p>
        </div>
      </div>


      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div key={plan.id}
              whileHover={!plan.default && { scale: 1.03 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}

              className={`relative rounded-3xl p-8 transition-all duration-300 border 
                ${isSelected
                  ? "border-emerald-600 shadow-2xl bg-white"
                  : "border-gray-200 bg-white shadow-md"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-600">
                  {plan.price}
                </span>
                <p className="text-gray-500 mt-1">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm" />
                    <span className="text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {!plan.default &&
                <button
                disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }} className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${isSelected
                    ? "bg-emerald-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                    }`}>
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}

                </button>
              }
            </motion.div>
          )
        })}
      </div>

      <div className='max-w-6xl mx-auto mt-10 glass-card rounded-2xl p-6'>
        <h2 className='text-lg font-semibold text-[#1b4036] mb-4'>Quick Comparison</h2>
        <div className='overflow-auto'>
          <table className='w-full min-w-155 text-sm'>
            <thead>
              <tr className='text-left text-slate-500 border-b border-[#d8e8e2]'>
                <th className='pb-3'>Feature</th>
                <th className='pb-3'>Free</th>
                <th className='pb-3'>Starter</th>
                <th className='pb-3'>Pro</th>
              </tr>
            </thead>
            <tbody className='text-slate-700'>
              <tr className='border-b border-[#e6f1ed]'>
                <td className='py-3'>Credits</td>
                <td>100</td>
                <td>150</td>
                <td>650</td>
              </tr>
              <tr className='border-b border-[#e6f1ed]'>
                <td className='py-3'>Detailed AI Feedback</td>
                <td>Basic</td>
                <td>Yes</td>
                <td>Advanced</td>
              </tr>
              <tr>
                <td className='py-3'>History + Analytics</td>
                <td>Limited</td>
                <td>Full</td>
                <td>Full + Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Pricing
