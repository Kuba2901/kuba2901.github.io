import React from 'react';
import './About.css';
// Import your profile image - make sure to add it to your assets folder
import profileImage from '../../assets/ja.jpg'; // Make sure this path is correct

function About() {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-lg-4 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration="800">
            <div className="profile-image-container">
              <img src={profileImage} alt="Profile Photo" className="img-fluid rounded-3 shadow-lg" />
              <div className="bg-circle"></div>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-8" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <h2 className="fw-bold mb-4 section-title">
              <span className="position-relative z-2">About Me</span>
            </h2>

            <p className="lead mb-4">
              I'm a Software and DevOps Engineer with 5 years of coding experience who thrives at the
              intersection of cloud infrastructure, automation, and AI-driven solutions. With a foundation
              from 42 coding school and CKA certification, I build systems that scale and innovate.
            </p>

            <div className="d-flex mt-4">
              <a href="#resume" className="btn btn-primary me-2">View My Resume</a>
              <a href="#contact" className="btn btn-outline-primary">Get In Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;