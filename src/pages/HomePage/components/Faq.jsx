import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does parametric insurance work?",
      answer: "Unlike traditional insurance, our AI-powered parametric system uses triggers like weather data or APIs. When a predefined event occurs (e.g., heavy rain over 50mm), you get paid automatically without filing a long claim."
    },
    {
      question: "When do I get paid?",
      answer: "Payouts are instant. Once our system detects the disruption in your assigned zone, the compensation is credited directly to your registered account within hours."
    },
    {
      question: "What events are covered?",
      answer: "We cover heavy rainfall, floods, severe pollution alerts (AQI > 300), extreme weather events (cyclones, storms), and government-imposed curfews or lockdowns."
    },
    {
      question: "How do I sign up?",
      answer: "Simply register with your phone number, select your delivery platform (Zomato, Swiggy, etc.), and subscribe to our weekly coverage plans based on your working zone."
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">Everything you need to know about ShieldPath</p>
      
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeFaq === index ? 'active' : ''}`}
          >
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              <h3>{faq.question}</h3>
              <div className="faq-icon">
                {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
