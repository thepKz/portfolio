import React from "react";
import { Fade } from "react-awesome-reveal";

import { certifications } from "../../api/resume";

const CertificationsSection: React.FC = () => {
  return (
    <section className="wpo-resume-section wpo-certifications-section" id="certifications">
      <div className="container">

        {/* TITLE */}
        <div className="wpo-section-title">
          <h2 className="poort-text poort-in-right">Chứng chỉ</h2>
        </div>

        {/* GRID */}
        <div className="resume-grid certs-grid">
          {certifications.map((cert, index) => (
            <Fade key={cert.id} direction="up" delay={index * 80} triggerOnce>
              <div className="cert-card">
                <h3>{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
