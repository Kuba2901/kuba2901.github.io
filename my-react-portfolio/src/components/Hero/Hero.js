import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Animated background elements */}
      <div className="background-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>

      <div className="container position-relative z-index-2">
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            <div className="mb-4">
              <h5 className="text-uppercase mb-3 subtitle">
                Welcome to my portfolio
              </h5>
              <h1 className="display-3 fw-bold mb-4 title">
                I'm <span className="highlight">Kuba</span>
              </h1>
              <div className="d-flex justify-content-center">
                <div className="typed-text">
                  <p className="lead mb-0">
                    Software Developer | DevOps Engineer | Rome, Italy
                  </p>
                </div>
              </div>
              <p className="my-4 description">
                I create innovative and practical tech solutions with a focus on automation,
                open-source technologies, and seamless user experiences.
              </p>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <a href="#projects" className="btn btn-primary btn-lg me-3">
                <span>View My Work</span>
                <i className="fas fa-arrow-right ms-2"></i>
              </a>
              <a href="#contact" className="btn btn-outline-primary btn-lg">
                <span>Get In Touch</span>
              </a>
            </div>

            <div className="mt-5 pt-5">
              <a href="#about" className="scroll-down-link">
                <div className="mouse">
                  <div className="wheel"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;