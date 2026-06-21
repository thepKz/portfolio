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
      question: "Làm sao để bắt đầu hợp tác với bạn?",
      answer:
        "Bạn chỉ cần điền form liên hệ bên dưới để chia sẻ thông tin dự án, tôi sẽ phản hồi trong thời gian sớm nhất.",
    },
    {
      id: 2,
      question: "Bạn nhận làm những loại dự án nào?",
      answer:
        "Tôi nhận phát triển web full-stack, backend/microservices, app mobile (Flutter) và hỗ trợ phân tích nghiệp vụ (BA).",
    },
    {
      id: 3,
      question: "Bạn có làm việc remote không?",
      answer:
        "Có. Tôi làm việc remote linh hoạt và quen với quy trình Agile/Scrum cho cả dự án trong và ngoài nước.",
    },
    {
      id: 4,
      question: "Stack công nghệ chính của bạn là gì?",
      answer:
        "React/Next.js, Node.js, Spring Boot, Flutter, cùng MongoDB/MySQL, Docker và CI/CD qua GitHub Actions.",
    },
    {
      id: 5,
      question: "Một dự án thường mất bao lâu?",
      answer:
        "Tùy quy mô và phạm vi, tôi sẽ ước lượng timeline cụ thể và chốt mốc bàn giao ngay khi nắm rõ yêu cầu.",
    },
    {
      id: 6,
      question: "Bạn đã làm qua bao nhiêu dự án?",
      answer:
        "Tôi đã tham gia hơn 30+ dự án lớn nhỏ với khách hàng, từ web, backend tới mobile, cả vai trò solo lẫn dẫn dắt nhóm.",
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
            <h2 className="poort-text poort-in-right">Hỏi đáp</h2>
          </div>

          <div className="wpo-faq-items">

            {/* TEXT */}
            <div className="faq-text">
              <p>
                Có câu hỏi? Dù bạn ở đâu, tôi luôn sẵn sàng hỗ trợ
                và giải đáp bất cứ lúc nào.
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