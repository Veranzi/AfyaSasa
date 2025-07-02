import React from "react";
import { Heart } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 min-h-screen overflow-hidden">
      <h1 className="text-4xl font-bold mb-8 text-pink-700 flex items-center gap-3">
        <Heart className="h-8 w-8 text-pink-400" /> Blogs
      </h1>

      {/* Soft background gradient behind the card */}
      <div className="relative mb-12">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-100 via-fuchsia-100 to-rose-100 opacity-80 blur-lg -z-10" />
        <a
          href="https://ayfasasa.blogspot.com/2025/06/ovarian-cyst-and-myth-surroundin-it.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl shadow-2xl p-1 hover:scale-105 transition-transform"
        >
          <div className="relative flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-lg rounded-2xl p-8 gap-8 border border-pink-200">
            {/* Floating Heart Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-8 flex-shrink-0 z-10">
              <div className="bg-pink-200 shadow-lg rounded-full h-20 w-20 flex items-center justify-center border-4 border-white">
                <Heart className="h-12 w-12 text-pink-500" />
              </div>
            </div>
            <div className="flex-1 mt-12 md:mt-0">
              <span className="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold px-4 py-1 rounded-full text-xs mb-3 shadow">Featured</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-3 leading-tight font-serif">From Myths to Evidence: A Clinical Review of Ovarian Cysts</h2>
              <p className="italic text-pink-700 mb-2 text-lg">“Doctors may underestimate the seriousness of ovarian torsion or ruptured hemorrhagic cysts, which require urgent care even in the absence of vaginal bleeding.”</p>
              <p className="text-gray-700 mb-4">
                Explore the AfyaSasa Blog for expert insights, research updates, and real-world experiences in ovarian cyst diagnosis and care. Learn about causes, symptoms, treatments, and common myths in a beautifully written, evidence-based article.
              </p>
              <span className="inline-block bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-lg text-sm shadow">Read on AfyaSasa Blog</span>
            </div>
          </div>
        </a>
      </div>

      {/* Ovarian Cyst Article */}
      <article className="mb-12 p-6 bg-white rounded-xl shadow-md border-l-4 border-pink-400">
        <h2 className="text-2xl font-semibold mb-2 text-pink-600">Understanding Ovarian Cysts: Clinical Insights</h2>
        <p className="text-gray-700 mb-4">
          Ovarian cysts are fluid-filled sacs that develop on or within an ovary. While most cysts are benign and asymptomatic, some can cause significant clinical symptoms or indicate underlying pathology. Clinicians should be aware of the types, risk factors, and management strategies for ovarian cysts to provide optimal patient care.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2 text-gray-800">Types of Ovarian Cysts</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>Functional cysts:</b> Follicular and corpus luteum cysts, usually benign and self-resolving.</li>
          <li><b>Dermoid cysts (teratomas):</b> May contain various tissue types; usually benign but can grow large.</li>
          <li><b>Endometriomas:</b> Associated with endometriosis; may cause pain and fertility issues.</li>
          <li><b>Cystadenomas:</b> Can be serous or mucinous; may grow large and require surgical removal.</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-2 text-gray-800">Clinical Presentation</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Asymptomatic (incidental finding on imaging)</li>
          <li>Pelvic pain or pressure</li>
          <li>Abdominal bloating or distension</li>
          <li>Acute pain (suggesting rupture or torsion)</li>
        </ul>
        <h3 className="text-lg font-bold mt-4 mb-2 text-gray-800">Diagnosis & Management</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Transvaginal ultrasound is the imaging modality of choice.</li>
          <li>Most simple cysts &lt;5 cm in premenopausal women can be observed.</li>
          <li>Complex, symptomatic, or persistent cysts may require further evaluation or surgical intervention.</li>
          <li>Consider malignancy risk factors: age, family history, ultrasound features.</li>
        </ul>
        <p className="text-gray-600 text-sm mt-4">For more detailed guidelines, refer to ACOG Practice Bulletin and local protocols.</p>
      </article>

      {/* Placeholder for more articles */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">More Articles Coming Soon:</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Approach to Adnexal Masses in Primary Care</li>
          <li>Ultrasound Features of Benign vs. Malignant Ovarian Lesions</li>
          <li>Management of Ovarian Cysts in Adolescents</li>
          <li>Fertility Considerations in Ovarian Cyst Patients</li>
        </ul>
      </div>
    </div>
  );
} 