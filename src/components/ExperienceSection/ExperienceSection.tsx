import React from "react";
import { Fade } from "react-awesome-reveal";

import { experiences } from "../../api/resume";

const ExperienceSection: React.FC = () => {
  return (
    <section className="wpo-resume-section wpo-experience-section" id="experience">
      <div className="container">

        {/* TITLE */}
        <div className="wpo-section-title">
          <h2 className="poort-text poort-in-right">Kinh nghiệm</h2>
        </div>

        {/* TIMELINE */}
        <div className="resume-timeline">
          {experiences.map((exp, index) => (
            <Fade key={exp.id} direction="up" delay={index * 100} triggerOnce>
              <div className="timeline-item">
                <div className="timeline-head">
                  <h3>{exp.company}</h3>
                  <span className="timeline-date">{exp.duration}</span>
                </div>
                <h4>{exp.position}</h4>
                <ul>
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
