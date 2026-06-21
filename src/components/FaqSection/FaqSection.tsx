import React, { useState } from "react";
import { useRef } from "react";
import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  useSplitTextAnimation(ref);

  const [active, setActive] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I book a photography session?",
      answer:
        "Simply use the contact form below to share your details, and I’ll get back to you shortly.",
    },
    {
      id: 2,
      question: "What types of photography do you offer?",
      answer:
        "I offer event, portrait, commercial, and wedding photography tailored to your needs.",
    },
    {
      id: 3,
      question: "How far in advance should I book?",
      answer:
        "It’s recommended to book at least 2–4 weeks in advance for availability.",
    },
    {
      id: 4,
      question: "Do you travel for photoshoots?",
      answer:
        "Yes, I’m available worldwide and happy to travel for your project.",
    },
    {
      id: 5,
      question: "How long does it take to receive photos?",
      answer:
        "Delivery usually takes 5–10 working days depending on project size.",
    },
    {
      id: 6,
      question: "Can I request custom photography packages?",
      answer:
        "Absolutely! Custom packages are available based on your requirements.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setActive(active === id ? null : id);
  };

  return (
    <section className="wpo-faq-section" ref={ref}>

      <div className="container">

        <div className="wpo-faq-wrap">

          {/* TITLE */}
          <div className="wpo-section-title">
            <h2 className="poort-text poort-in-right">Helpdesk</h2>
          </div>

          <div className="wpo-faq-items">

            {/* TEXT */}
            <div className="faq-text">
              <p>
                Have questions? I'm here for you, no matter where you are,
                ready to provide support and answers anytime.
              </p>
            </div>

            {/* ACCORDION */}
            <div className="accordion">

              {faqs.map((item) => (

                <div
                  key={item.id}
                  className={`accordion-item ${
                    active === item.id ? "active" : ""
                  }`}
                >

                  <h3 className="accordion-header">

                    <button
                      className={`accordion-button ${
                        active === item.id ? "" : "collapsed"
                      }`}
                      onClick={() => toggleFAQ(item.id)}
                    >
                      {item.question}
                    </button>

                  </h3>

                  <div
                    className={`accordion-collapse ${
                      active === item.id ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p>{item.answer}</p>
                    </div>
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FaqSection;