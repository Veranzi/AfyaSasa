"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, ArrowRight, MapPin, Brain, User, Ruler, ChartLine, FlaskConical, Stethoscope, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useGoogleSheet } from "@/hooks/useGoogleSheet"

const OVARIAN_DATA_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOrLbxUb6jmar3LIp2tFGHHimYL7Tl6zZTRNqJohoWBaq7sk0UHkxTKPwknP3muI5rx2kE6PwSyrKk/pub?gid=0&single=true&output=csv";

export function PredictionDemo() {
  const [activeTab, setActiveTab] = useState<'prediction' | 'chatbot'>("prediction")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! I'm your medical assistant. I can answer questions about ovarian cysts and provide information based on medical data. How can I help you today?" }])
  const [userInput, setUserInput] = useState("")
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [sampleQuestions, setSampleQuestions] = useState([
    "How many patients are from the Nairobi region?",
    "What is the average age of post-menopausal patients?",
    "What is the recommended management for patient OC-1020?",
    "List all patients with a cyst size greater than 9.5 cm.",
    "Which patient has the highest CA 125 level, and what is the value?",
    "What are the most common symptoms reported by pre-menopausal patients?",
  ])
  const [formData, setFormData] = useState({
    age: "12",
    menopauseStatus: "Post-menopausal",
    cystSize: "4.2",
    cystGrowthRate: "2.3",
    ca125: "35",
    ultrasoundFeatures: "Simple cyst",
    symptoms: "Pelvic pain, Nausea",
  })
  const [showResult, setShowResult] = useState(false)
  const ovarianSheet = useGoogleSheet(OVARIAN_DATA_CSV);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);
    setShowResult(false);
    setRecommendation("");
    const requestBody = {
      Age: parseInt(formData.age, 10),
      Menopause_Status: formData.menopauseStatus,
      Cyst_Size_cm: parseFloat(formData.cystSize),
      Cyst_Growth_Rate_cm_month: parseFloat(formData.cystGrowthRate),
      CA_125_Level: parseInt(formData.ca125, 10),
      Ultrasound_Features: formData.ultrasoundFeatures,
      Reported_Symptoms: formData.symptoms,
    };
    try {
      const res = await fetch("https://ovarian-cyst-detection.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (res.ok) {
        setRecommendation(data.recommended_management || "Observation");
        setShowResult(true);
      } else {
        setRecommendation("Unable to generate recommendation at this time. Please try again or consult with a healthcare provider.");
        setShowResult(true);
      }
    } catch (error) {
      setRecommendation("Unable to generate recommendation at this time. Please try again or consult with a healthcare provider.");
      setShowResult(true);
    } finally {
      setIsAnalyzing(false);
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, newMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsLoadingChat(true);
    try {
      const res = await fetch("https://ovarian-cyst-detection.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentInput }),
      });
      const data = await res.json();
      if (res.ok) {
        const responseText = data.answer || data.response || data.recommended_management || "I apologize, but I'm unable to provide a specific answer at this moment.";
        setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
        if (data.sample_questions && Array.isArray(data.sample_questions)) {
          setSampleQuestions(data.sample_questions);
        }
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "I apologize, but I encountered an error. Please try again." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I apologize, but I encountered an error. Please try again." }]);
    } finally {
      setIsLoadingChat(false);
    }
  }

  return (
    <section className="py-10 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#ffe4ef] font-sans">
      <div className="container px-0 max-w-full">
        {/* Main Flex Layout */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          {/* Sidebar Tabs */}
          <div className="flex flex-row md:flex-col w-full md:w-64 bg-pink-50 rounded-2xl p-2 md:p-4 gap-2 md:gap-4 items-stretch mb-4 md:mb-0">
            {/* Sidebar Header */}
            <header className="mb-4 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-3">
                <span>
                  <svg className="inline w-7 h-7 md:w-8 md:h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" /></svg>
                </span>
                Ovarian Cyst Detection System
              </h1>
              <p className="text-base md:text-lg text-gray-500">Advanced diagnostic tool for ovarian cyst assessment and medical guidance</p>
            </header>
            <div className="flex flex-row md:flex-col gap-2 md:gap-4 w-full">
              <button
                className={`tab-btn w-full px-6 py-3 rounded-xl font-semibold shadow transition-all text-lg text-left ${activeTab === 'prediction' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white' : 'bg-white text-pink-700 hover:bg-pink-100 border border-pink-200'}`}
                onClick={() => setActiveTab('prediction')}
              >
                Cyst Prediction
              </button>
              <button
                className={`tab-btn w-full px-6 py-3 rounded-xl font-semibold shadow transition-all text-lg text-left ${activeTab === 'chatbot' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white' : 'bg-white text-pink-700 hover:bg-pink-100 border border-pink-200'}`}
                onClick={() => setActiveTab('chatbot')}
              >
                Medical Chatbot
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 pr-4 md:pr-16">
            <div className="tab-content bg-white rounded-2xl shadow-xl p-2 md:p-4 animate-fadeIn w-full">
              {activeTab === 'prediction' && (
                <div className="form-container w-full px-0 sm:px-2 md:px-4 pr-4 md:pr-12">
                  <h2 className="text-2xl font-bold text-center mb-2 text-pink-700 flex items-center justify-center gap-2"><ClipboardList className="w-6 h-6 text-pink-500" /> Patient Assessment Form</h2>
                  <p className="text-center mb-6 text-gray-500">Fill in the patient details to get management recommendations</p>
                  <form onSubmit={handleAnalyze} className="space-y-6 w-full text-base md:text-lg">
                    <div className="form-row flex flex-col md:flex-row gap-4 md:gap-6 mb-2 w-full">
                      <div className="form-col flex-1 min-w-0 w-full">
                        <div className="form-group mb-2 w-full">
                          <Label htmlFor="age" className="font-semibold text-base md:text-lg flex items-center gap-2"><User className="w-4 h-4 text-pink-500" /> Age</Label>
                          <Input
                            id="age"
                            type="number"
                            min={1}
                            max={120}
                            className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-col flex-1 min-w-0 w-full">
                        <div className="form-group mb-2 w-full">
                          <Label htmlFor="menopauseStatus" className="font-semibold text-base md:text-lg flex items-center gap-2"><User className="w-4 h-4 text-rose-500" /> Menopause Status</Label>
                          <Select
                            value={formData.menopauseStatus}
                            onValueChange={value => setFormData({ ...formData, menopauseStatus: value })}
                          >
                            <SelectTrigger className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pre-menopausal">Pre-menopausal</SelectItem>
                              <SelectItem value="Post-menopausal">Post-menopausal</SelectItem>
                              <SelectItem value="Peri-menopausal">Peri-menopausal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="form-row flex flex-col md:flex-row gap-4 md:gap-6 mb-2 w-full">
                      <div className="form-col flex-1 min-w-0 w-full">
                        <div className="form-group mb-2 w-full">
                          <Label htmlFor="cystSize" className="font-semibold text-base md:text-lg flex items-center gap-2"><Ruler className="w-4 h-4 text-pink-500" /> Cyst Size (cm)</Label>
                          <Input
                            id="cystSize"
                            type="number"
                            step="0.1"
                            min={0.1}
                            max={20}
                            className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg"
                            value={formData.cystSize}
                            onChange={e => setFormData({ ...formData, cystSize: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-col flex-1 min-w-0 w-full">
                        <div className="form-group mb-2 w-full">
                          <Label htmlFor="cystGrowthRate" className="font-semibold text-base md:text-lg flex items-center gap-2"><ChartLine className="w-4 h-4 text-rose-500" /> Growth Rate (cm/month)</Label>
                          <Input
                            id="cystGrowthRate"
                            type="number"
                            step="0.1"
                            min={0}
                            max={10}
                            className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg"
                            value={formData.cystGrowthRate}
                            onChange={e => setFormData({ ...formData, cystGrowthRate: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-2 w-full">
                      <Label htmlFor="ca125" className="font-semibold text-base md:text-lg flex items-center gap-2"><FlaskConical className="w-4 h-4 text-pink-400" /> CA-125 Level (U/mL)</Label>
                      <Input
                        id="ca125"
                        type="number"
                        min={0}
                        max={1000}
                        className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg"
                        value={formData.ca125}
                        onChange={e => setFormData({ ...formData, ca125: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group mb-2 w-full">
                      <Label htmlFor="ultrasoundFeatures" className="font-semibold text-base md:text-lg flex items-center gap-2"><FlaskConical className="w-4 h-4 text-rose-400" /> Ultrasound Features</Label>
                      <Select
                        value={formData.ultrasoundFeatures}
                        onValueChange={value => setFormData({ ...formData, ultrasoundFeatures: value })}
                      >
                        <SelectTrigger className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg">
                          <SelectValue placeholder="Select feature" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Simple cyst">Simple cyst</SelectItem>
                          <SelectItem value="Complex cyst">Complex cyst</SelectItem>
                          <SelectItem value="Solid component">Solid component</SelectItem>
                          <SelectItem value="Multilocular">Multilocular</SelectItem>
                          <SelectItem value="With septations">With septations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-group mb-2 w-full">
                      <Label htmlFor="symptoms" className="font-semibold text-base md:text-lg flex items-center gap-2"><Stethoscope className="w-4 h-4 text-pink-400" /> Reported Symptoms (comma separated)</Label>
                      <Input
                        id="symptoms"
                        type="text"
                        className="form-control mt-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm w-full text-base md:text-lg"
                        value={formData.symptoms}
                        onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                        required
                      />
                      <small className="text-gray-400 text-sm md:text-base">Common symptoms: Pelvic pain, Bloating, Irregular periods, Nausea, Frequent urination</small>
                    </div>
                    <Button
                      type="submit"
                      className="submit-btn bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-lg rounded-xl shadow-lg py-4 px-8 w-full sm:w-56 mx-auto block transition-all duration-200 hover:scale-105 hover:shadow-xl justify-center flex"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (<span className="flex items-center justify-center gap-2"><Clock className="animate-spin w-5 h-5" /> Processing...</span>) : <span className="w-full text-center">Recommend</span>}
                    </Button>
                  </form>
                  {showResult && (
                    <div className="result-container mt-8 p-6 rounded-lg bg-pink-50 border-l-4 border-pink-400 w-full">
                      <h3 className="result-title text-lg font-bold flex items-center gap-2 text-pink-700 mb-2"><CheckCircle className="w-5 h-5 text-pink-500" /> Recommended Management</h3>
                      <div className="result-content text-pink-700 text-xl font-semibold">{recommendation}</div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'chatbot' && (
                <div className="chat-container w-full">
                  <div className="chat-header bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 px-6 rounded-t-xl text-xl font-bold flex items-center gap-2 justify-center">
                    <Bot className="w-6 h-6 text-white" /> Medical Assistant
                  </div>
                  <div className="chat-messages h-80 md:h-96 p-2 sm:p-4 overflow-y-auto bg-[#fff0f6] w-full">
                    {messages.map((message, idx) => (
                      <div key={idx} className={`message mb-4 p-4 rounded-lg max-w-[80%] ${message.role === 'user' ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white ml-auto rounded-br-none' : 'bg-white text-pink-900 mr-auto rounded-bl-none border border-pink-100'}`}>
                        {message.content}
                      </div>
                    ))}
                    {isLoadingChat && (
                      <div className="message bot-message mb-4 p-4 rounded-lg max-w-[80%] bg-white text-pink-900 mr-auto rounded-bl-none border border-pink-100">
                        <span className="flex items-center gap-2"><Clock className="animate-spin w-4 h-4 text-pink-500" /> Thinking...</span>
                      </div>
                    )}
                  </div>
                  <div className="chat-input flex p-2 sm:p-4 bg-white border-t border-pink-100 w-full">
                    <Input
                      placeholder="Ask a medical question..."
                      className="flex-1 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 shadow-sm"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoadingChat}
                    />
                    <Button
                      className="ml-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg px-6 font-semibold border-0"
                      onClick={handleSendMessage}
                      disabled={isLoadingChat}
                    >
                      {isLoadingChat ? (<span className="flex items-center gap-2"><Clock className="animate-spin w-4 h-4" /> Sending...</span>) : (<span className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Send</span>)}
                    </Button>
                  </div>
                  {sampleQuestions.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-center text-pink-700 font-semibold mb-2">Sample Questions</h3>
                      <div className="suggestions flex flex-wrap gap-2 justify-center w-full">
                        {sampleQuestions.map((question, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            className="suggestion text-xs rounded-full border-pink-200 hover:bg-pink-100 text-pink-700"
                            onClick={() => setUserInput(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="text-center py-8 text-pink-400 mt-10 text-base flex items-center justify-center gap-3">
          <svg className="inline w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" fill="#F43F5E" stroke="#F43F5E"/></svg>
          <span className="font-bold text-pink-700 text-lg">AfyaSasa</span>
          <span className="text-pink-400">&copy; {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  )
}

// Helper icon for clipboard list (since Lucide doesn't have one)
function ClipboardList(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>
  )
}

