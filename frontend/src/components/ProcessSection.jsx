import React from "react";
import "../css/landing.css";

const ProcessSection = () => {
  return (
    <section className="process">
      <h2>How We Work</h2>

      <ol>
        <li>
          <strong>Consult:</strong> We understand your goals and challenges.
        </li>
        <li>
          <strong>Plan:</strong> We create a clear, actionable strategy.
        </li>
        <li>
          <strong>Implement:</strong> We support execution step by step.
        </li>
        <li>
          <strong>Review:</strong> We assess progress and refine where needed.
        </li>
        <li>
          <strong>Grow:</strong> You move forward with confidence.
        </li>
      </ol>
    </section>
  );
};

export default ProcessSection;
