import React from "react";
import { Fade } from "react-awesome-reveal";

import { skillGroups } from "../../api/resume";

const SkillsSection: React.FC = () => {
  return (
    <section className="wpo-resume-section wpo-skills-section" id="skills">
      <div className="container">

        {/* TITLE */}
        <div className="wpo-section-title">
          <h2 className="poort-text poort-in-right">Kỹ năng</h2>
        </div>

        {/* GRID */}
        <div className="resume-grid skills-grid">
          {skillGroups.map((group, index) => (
            <Fade key={group.id} direction="up" delay={index * 80} triggerOnce>
              <div className="skill-card">
                <h3>{group.label}</h3>
                <ul className="skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
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

export default SkillsSection;
