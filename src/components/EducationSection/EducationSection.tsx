import React from "react";
import { Fade } from "react-awesome-reveal";

import { education } from "../../api/resume";

const EducationSection: React.FC = () => {
  return (
    <section className="wpo-resume-section wpo-education-section" id="education">
      <div className="container">

        {/* TITLE */}
        <div className="wpo-section-title">
          <h2 className="poort-text poort-in-right">Học vấn</h2>
        </div>

        {/* TIMELINE */}
        <div className="resume-timeline">
          {education.map((edu, index) => (
            <Fade key={edu.id} direction="up" delay={index * 100} triggerOnce>
              <div className="timeline-item">
                <div className="timeline-head">
                  <h3>{edu.school}</h3>
                  <span className="timeline-date">{edu.duration}</span>
                </div>
                <h4>{edu.program}</h4>
                <p>{edu.detail}</p>
              </div>
            </Fade>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationSection;
