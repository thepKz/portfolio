import React from "react";
import { Fade } from "react-awesome-reveal";

import { skillGroups } from "../../api/resume";

const SkillsSection: React.FC = () => {
  const totalSkills = skillGroups.reduce(
    (sum, group) => sum + group.items.length,
    0
  );

  return (
    <section className="wpo-resume-section wpo-skills-section" id="skills">
      <div className="container">

        {/* TITLE */}
        <div className="wpo-section-title">
          <h2 className="poort-text poort-in-right">Kỹ năng</h2>
        </div>

        {/* SWISS INDEX TABLE */}
        <div className="skills-index">

          {/* META ROW */}
          <div className="skills-meta">
            <span className="skills-meta-label">Bộ kỹ năng</span>
            <span className="skills-meta-count">
              {String(totalSkills).padStart(2, "0")} mục · {skillGroups.length} nhóm
            </span>
          </div>

          {/* GROUPS AS RULED ROWS */}
          {skillGroups.map((group, index) => (
            <Fade key={group.id} direction="up" delay={index * 60} triggerOnce>
              <div className="skill-row">

                <div className="skill-row-head">
                  <span className="skill-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="skill-row-label">{group.label}</h3>
                </div>

                <ul className="skill-row-items">
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
