import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Brain, Code, Calculator, Stethoscope } from "lucide-react"

export function Team() {
  const team = [
    {
      name: "Veronicah Anzimbu",
      role: "Lead AI Researcher",
      expertise: "Machine Learning, Healthcare AI, Predictive Models",
      icon: Brain,
      bio: "Leading AI researcher specializing in healthcare applications and predictive modeling for women's health",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Paul Ndiragu",
      role: "Full Stack Developer",
      expertise: "React, Node.js, Healthcare Systems, API Development",
      icon: Code,
      bio: "Full-stack developer with expertise in building scalable healthcare technology solutions",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Ian Bravo",
      role: "Finance & Computer Specialist",
      expertise: "Financial Systems, Cost Optimization, Healthcare Economics",
      icon: Calculator,
      bio: "Finance and computer specialist focused on cost-effective healthcare solutions and system optimization",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Mercy Kasiva",
      role: "Clinical Advisor & Data Scientist",
      expertise: "Clinical Practice, Data Analysis, Women's Health",
      icon: Stethoscope,
      bio: "Clinical advisor and data scientist with deep expertise in women's health and medical data analysis",
      color: "from-rose-500 to-pink-500",
    },
  ]

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Team AfyaSasa</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate team of healthcare professionals, AI researchers, and developers dedicated to transforming
            women's health outcomes through innovative technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center border-0"
            >
              <CardContent className="p-6">
                {/* Profile Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-24 h-24 mx-auto bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div
                    className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <member.icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <Badge className={`mb-3 bg-gradient-to-r ${member.color} text-white border-0`}>{member.role}</Badge>
                <p className="text-sm text-gray-600 mb-3 font-medium">{member.expertise}</p>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">{member.bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-100 cursor-pointer transition-colors group">
                    <Github className="h-4 w-4 text-gray-600 group-hover:text-pink-600" />
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 cursor-pointer transition-colors group">
                    <Linkedin className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 cursor-pointer transition-colors group">
                    <Mail className="h-4 w-4 text-gray-600 group-hover:text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl">
            <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
            <div className="text-gray-700 font-medium">Years Combined Experience</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-gray-700 font-medium">Specialized Domains</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-700 font-medium">Committed to Women's Health</div>
          </div>
        </div>

        {/* Hackathon Banner */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Code Her Care Hackathon 2025</h3>
            <p className="text-lg mb-6">Competing in Track 2: Ovarian Cyst Growth & Treatment Prediction</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                AI/ML Prediction Models
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Healthcare Technology
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Women's Health Focus
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Low-Resource Settings
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
