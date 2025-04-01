import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import aboutImage from "/assets/about/aboutImage.png"
import cursorIcon from "/assets/about/cursorIcon.png"
import serverIcon from "/assets/about/serverIcon.png"
import uiIcon from "/assets/about/uiIcon.png"

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>BIO</h2>
      <div className={styles.content}>
        <img
          src={aboutImage}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={cursorIcon} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Age</h3>
              <p>
                21
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={serverIcon} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Gender</h3>
              <p>
                Female
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={serverIcon} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Location</h3>
              <p>
                Kolkata, West Bengal
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={uiIcon} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>Qualifications</h3>
              <p>
                12th Pass
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};