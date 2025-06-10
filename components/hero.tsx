import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Brain, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-rose-600 text-white"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-8 w-8 text-pink-300" />
            <span className="text-xl font-semibold text-pink-200">AfyaSasa</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Ovarian Cyst
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300">
              Prediction & Care
            </span>
          </h1>

          <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Revolutionizing women's healthcare with predictive AI models for early diagnosis, smart treatment planning,
            and comprehensive care coordination in low-resource settings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Try Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              View Research
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Brain className="h-6 w-6 text-pink-300" />
              <span className="font-medium">AI Prediction Models</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <TrendingUp className="h-6 w-6 text-yellow-300" />
              <span className="font-medium">Growth Forecasting</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Heart className="h-6 w-6 text-pink-300" />
              <span className="font-medium">Care Coordination</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
