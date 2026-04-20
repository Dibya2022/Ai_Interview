import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [modeFilter, setModeFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])

    const filteredInterviews = interviews.filter((item) => {
        const bySearch = item.role.toLowerCase().includes(search.toLowerCase()) || item.mode.toLowerCase().includes(search.toLowerCase())
        const byStatus = statusFilter === "all" ? true : item.status.toLowerCase() === statusFilter
        const byMode = modeFilter === "all" ? true : item.mode.toLowerCase() === modeFilter.toLowerCase()
        return bySearch && byStatus && byMode
    })

    const sortedInterviews = [...filteredInterviews].sort((a, b) => {
        if (sortBy === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt)
        }
        if (sortBy === "highScore") {
            return (b.finalScore || 0) - (a.finalScore || 0)
        }
        if (sortBy === "lowScore") {
            return (a.finalScore || 0) - (b.finalScore || 0)
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    const averageScore = interviews.length
        ? (interviews.reduce((acc, item) => acc + (item.finalScore || 0), 0) / interviews.length).toFixed(1)
        : "0.0"

    const completedCount = interviews.filter((item) => item.status === "completed").length
    const technicalCount = interviews.filter((item) => item.mode === "Technical").length
    const sevenDayActivity = interviews.filter((item) => {
        const createdAt = new Date(item.createdAt).getTime()
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
        return createdAt >= sevenDaysAgo
    }).length

    const exportCsv = () => {
        if (!sortedInterviews.length) return;

        const headers = ["Role", "Experience", "Mode", "Score", "Status", "Date"]
        const rows = sortedInterviews.map((item) => ([
            item.role,
            item.experience,
            item.mode,
            item.finalScore || 0,
            item.status,
            new Date(item.createdAt).toLocaleDateString()
        ]))

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "interview-history.csv"
        link.click()
        URL.revokeObjectURL(url)
    }


    return (
        <div className='min-h-screen py-10 px-4' >
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='mb-8 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
                            Interview History
                        </h1>
                        <p className='text-gray-500 mt-2'>
                            Track your past interviews and performance reports
                        </p>

                    </div>
                </div>

                <div className='grid md:grid-cols-3 gap-4 mb-6'>
                    <div className='glass-card rounded-2xl p-5'>
                        <p className='text-sm text-slate-500'>Average Score</p>
                        <p className='text-3xl font-bold text-[#0f7f67] mt-1'>{averageScore}/10</p>
                    </div>

                    <div className='glass-card rounded-2xl p-5'>
                        <p className='text-sm text-slate-500'>Completed Interviews</p>
                        <p className='text-3xl font-bold text-[#0f7f67] mt-1'>{completedCount}</p>
                    </div>

                    <div className='glass-card rounded-2xl p-5'>
                        <p className='text-sm text-slate-500'>Technical Sessions</p>
                        <p className='text-3xl font-bold text-[#0f7f67] mt-1'>{technicalCount}</p>
                    </div>
                </div>

                <div className='glass-card rounded-2xl p-5 mb-6'>
                    <p className='text-sm text-slate-500'>Last 7-Day Activity</p>
                    <p className='text-3xl font-bold text-[#0f7f67] mt-1'>{sevenDayActivity}</p>
                    <p className='text-xs text-slate-500 mt-1'>Interviews completed in the past week</p>
                </div>

                <div className='glass-card rounded-2xl p-4 mb-7 flex flex-col md:flex-row gap-3'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search by role or mode'
                        className='flex-1 rounded-xl border border-[#cbe2da] bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#75bca8]'
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className='rounded-xl border border-[#cbe2da] bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#75bca8]'
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="incompleted">Incompleted</option>
                    </select>

                    <select
                        value={modeFilter}
                        onChange={(e) => setModeFilter(e.target.value)}
                        className='rounded-xl border border-[#cbe2da] bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#75bca8]'
                    >
                        <option value="all">All Modes</option>
                        <option value="Technical">Technical</option>
                        <option value="HR">HR</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='rounded-xl border border-[#cbe2da] bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#75bca8]'
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highScore">Highest Score</option>
                        <option value="lowScore">Lowest Score</option>
                    </select>

                    <button onClick={exportCsv} className='secondary-btn px-4 py-2.5 text-sm'>Export CSV</button>
                </div>


                {interviews.length === 0 ?
                    <div className='bg-white p-10 rounded-2xl shadow text-center'>
                        <p className='text-gray-500'>
                            No interviews found. Start your first interview.
                        </p>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {sortedInterviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className='glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.role}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-emerald-600">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                        {sortedInterviews.length === 0 && (
                            <div className='glass-card p-7 rounded-2xl text-center text-slate-600'>
                                No interviews match your filters.
                            </div>
                        )}

                    </div>
                }
            </div>

        </div>
    )
}

export default InterviewHistory
