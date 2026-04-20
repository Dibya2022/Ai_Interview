import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const draftKey = `interview-draft-${interviewId}-${currentIndex}`;

  const getAnswerHint = () => {
    if (wordCount < 15) {
      return "Try a longer answer with one concrete example.";
    }
    if (wordCount > 140) {
      return "Answer is long. Keep it concise and focused on impact.";
    }
    return "Great length. Add a measurable result to make it stronger.";
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice =
        voices.find((v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice =
        voices.find((v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    }

    runIntro()
  }, [selectedVoice, isIntroPhase, currentIndex])

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1
      })
    }, 1000);

    return () => clearInterval(timer)
  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isIntroPhase) return;

    try {
      const saved = window.localStorage.getItem(draftKey);
      if (saved) {
        setAnswer(saved);
      } else {
        setAnswer("");
      }
    } catch {
      // Ignore local storage read errors.
    }
  }, [draftKey, isIntroPhase]);

  useEffect(() => {
    if (isIntroPhase) return;

    try {
      if (answer.trim()) {
        window.localStorage.setItem(draftKey, answer);
      } else {
        window.localStorage.removeItem(draftKey);
      }
    } catch {
      // Ignore local storage write errors.
    }
  }, [answer, draftKey, isIntroPhase]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch {
        // Ignore duplicate start errors from browser speech API.
      }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true })

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    try {
      window.localStorage.removeItem(draftKey);
    } catch {
      // Ignore local storage remove errors.
    }

    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const submitShortcut = (event.ctrlKey || event.metaKey) && event.key === "Enter";
      if (!submitShortcut || feedback || isSubmitting) return;
      event.preventDefault();
      submitAnswer();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [feedback, isSubmitting, answer, currentIndex, timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] glass-card rounded-3xl shadow-2xl border border-[#d1e5de] flex flex-col lg:flex-row overflow-hidden'>

        <div className='w-full lg:w-[35%] bg-white/80 flex flex-col items-center p-6 space-y-6 border-r border-[#d4e7e1]'>
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {subtitle && (
            <div className='w-full max-w-md bg-[#f6fcf9] border border-[#d4e7e1] rounded-xl p-4 shadow-sm'>
              <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
            </div>
          )}

          <div className='w-full max-w-md bg-white border border-[#d4e7e1] rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Interview Status
              </span>
              {isAIPlaying && <span className='text-sm font-semibold text-emerald-600'>
                AI Speaking
              </span>}
            </div>

            <div className="h-px bg-[#dbe9e4]"></div>

            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-[#dbe9e4]"></div>

            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
                <p className='text-xs text-gray-400'>Current Question</p>
              </div>

              <div>
                <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
                <p className='text-xs text-gray-400'>Total Questions</p>
              </div>
            </div>

            {!isIntroPhase && (
              <div className='rounded-xl bg-[#f4fbf8] border border-[#d3e7e0] p-3 text-xs text-[#2f6557] font-semibold text-center'>
                Difficulty: {currentQuestion?.difficulty || "normal"}
              </div>
            )}
          </div>
        </div>

        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative bg-white/70'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>

          {!isIntroPhase && (
            <div className='relative mb-4 bg-[#f6fcf9] p-4 sm:p-6 rounded-2xl border border-[#d4e7e1] shadow-sm'>
              <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                Question {currentIndex + 1} of {questions.length}
              </p>

              <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>{currentQuestion?.question}</div>
            </div>
          )}

          {!isIntroPhase && (
            <div className='mb-4 grid sm:grid-cols-3 gap-2 text-xs sm:text-sm'>
              <div className='bg-white border border-[#d5e7e1] rounded-lg px-3 py-2 text-slate-600'>Words: <span className='font-semibold text-[#0f8f71]'>{wordCount}</span></div>
              <div className='bg-white border border-[#d5e7e1] rounded-lg px-3 py-2 text-slate-600'>Time left: <span className='font-semibold text-[#0f8f71]'>{timeLeft}s</span></div>
              <div className='bg-white border border-[#d5e7e1] rounded-lg px-3 py-2 text-slate-600'>Mic: <span className='font-semibold text-[#0f8f71]'>{isMicOn ? "On" : "Off"}</span></div>
            </div>
          )}

          {!isIntroPhase && !feedback && (
            <div className='mb-3 rounded-xl border border-[#d4e7e1] bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-600 flex flex-wrap items-center justify-between gap-2'>
              <span>Shortcut: press Ctrl/Command + Enter to submit quickly.</span>
              <button
                onClick={() => setAnswer("")}
                className='secondary-btn px-3 py-1.5 text-xs'
              >
                Clear Draft
              </button>
            </div>
          )}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-white p-4 sm:p-6 rounded-2xl resize-none outline-none border border-[#cfe4dc] focus:ring-2 focus:ring-[#58af97] transition text-gray-800"
          />

          {!isIntroPhase && !feedback && (
            <div className='mt-3 rounded-xl border border-[#d4e7e1] bg-[#f4fbf8] px-4 py-3'>
              <p className='text-xs font-semibold text-[#2f6557] mb-1'>Live Answer Coach</p>
              <p className='text-sm text-slate-600'>{getAnswerHint()}</p>
            </div>
          )}

          {!feedback ? (
            <div className='flex items-center gap-4 mt-6'>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#123a31] text-white shadow-lg'>
                {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className='flex-1 bg-linear-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'>
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'>
              <p className='text-emerald-700 font-medium mb-4'>{feedback}</p>

              <button
                onClick={handleNext}
                className='w-full bg-linear-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
                Next Question <BsArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Step2Interview
