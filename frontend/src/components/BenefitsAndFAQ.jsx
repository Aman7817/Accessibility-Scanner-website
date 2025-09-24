import React from "react";
import { useState } from "react";
import { CheckCircle, HelpCircle } from "lucide-react";

const BenefitsAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Is the scan free?",
      a: "Yes, currently it’s 100% free. You can scan websites without any registration."
    },
    {
      q: "How can I save my report?",
      a: "You can download or export your reports as PDF directly from the Dashboard."
    },
    {
      q: "Can I scan multiple websites?",
      a: "Yes, you can scan as many websites as you want without any limit."
    },
    {
      q: "Which standards does this accessibility scan follow?",
      a: "Our scan is powered by AI + Axe-core and follows WCAG 2.1 guidelines."
    }
  ];

  return (
    <div className="mt-16 px-6 md:px-20">
      {/* Benefits Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Why Use WebLoom?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-2xl">
            <CheckCircle className="mx-auto text-green-500 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Improve SEO</h3>
            <p className="text-gray-600 text-sm">
              Accessible websites rank higher on Google and reach a larger audience.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl">
            <CheckCircle className="mx-auto text-green-500 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Legal Compliance</h3>
            <p className="text-gray-600 text-sm">
              Stay compliant with WCAG 2.1 standards and avoid accessibility-related lawsuits.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl">
            <CheckCircle className="mx-auto text-green-500 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Better User Experience</h3>
            <p className="text-gray-600 text-sm">
              Accessible websites are easier to use for everyone, including people with disabilities.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow-sm cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{faq.q}</h3>
                <HelpCircle
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180 text-blue-500" : "text-gray-500"
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BenefitsAndFAQ;
