import React from "react";

export default function BlogsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-pink-700">Blogs</h1>

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