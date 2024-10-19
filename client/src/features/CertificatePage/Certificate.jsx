import React from "react";
import "./Certificate.css";
import AppLayout from "../../components/AppLayout";

const CertificatePage = () => {
  return (
    <AppLayout title="Certifications">
      <div className="certificate-container">
        <h1 className="page-title">Google Certificates</h1>

        <div className="certificate-card">
          <h2 className="certificate-title">Google Data Analytics Certificate</h2>
          <p>
            Data analytics is the collection, transformation, and organization of data
            in order to draw conclusions, make predictions, and drive informed decision-making.
          </p>
          <p>
            Over 8 courses, gain in-demand skills that prepare you for an entry-level job.
            You’ll learn from Google employees whose foundations in data analytics served as
            launchpads for their own careers.
          </p>
          <p>
            Upon completion, you’ll gain a thorough understanding of data analytics, from
            understanding data collection, analyzing data sets, creating meaningful visualizations,
            and more. At under 10 hours per week, you can complete the certificate in less than 6 months.
          </p>
          <div className="progress-container">
            <div className="progress-label">Progress: 80%</div>
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        <div className="certificate-card">
          <h2 className="certificate-title">Google Project Management Certificate</h2>
          <p>
            Project managers are natural problem-solvers. They set the plan and guide teammates,
            and manage changes, risks, and stakeholders. Gain in-demand skills that will prepare
            you for an entry-level job. Learn from Google employees whose foundations in project
            management served as launchpads for their own careers.
          </p>
          <p>
            Upon completion, you can directly apply for jobs with Google and over 150 U.S. employers
            including Deloitte, Target, Verizon, and of course, Google.
          </p>
          <p>
            This program qualifies you for over 100 hours of project management education, which
            helps prepare you for Project Management Institute Certifications like the globally-recognized
            Certified Associate in Project Management (CAPM)®.
          </p>
          <div className="progress-container">
            <div className="progress-label">Progress: 65%</div>
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: "65%" }}></div>
            </div>
          </div>
        </div>

        <div className="certificate-card">
          <h2 className="certificate-title">Google UX Design Certificate</h2>
          <p>
            User experience (UX) designers focus on the interaction that users have with products,
            like websites, apps, and physical objects. They make those everyday interactions useful,
            enjoyable, and accessible.
          </p>
          <p>
            Over 7 courses, gain in-demand skills that will prepare you for an entry-level job. You will
            create designs on paper and in digital design tools like Figma and Adobe XD.
          </p>
          <p>
            By the end of the certificate program, you will have a professional UX portfolio that includes
            three end-to-end projects, so that you’re ready to apply for jobs. Upon completion, you can
            directly apply for jobs with Google and over 150 U.S. employers, including Deloitte, Target,
            Verizon, and of course, Google.
          </p>
          <div className="progress-container">
            <div className="progress-label">Progress: 50%</div>
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: "50%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CertificatePage;