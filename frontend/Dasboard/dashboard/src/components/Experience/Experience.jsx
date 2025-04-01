import React from "react";

import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import css from "/assets/skills/css.png"
import figma from "/assets/skills/figma.png"
import graphql from "/assets/skills/graphql.png"
import html from "/assets/skills/html.png"
import mongodb from "/assets/skills/mongodb.png"
import node from "/assets/skills/node.png"
import google from "/assets/history/google.png";
import microsoft from "/assets/history/microsoft.png";
import netflix from "/assets/history/netflix.png";

// Map organization names to imported images
export const historyImages = {
  google,
  microsoft,
  netflix,
};

// Map image titles to imported images
export const skillImages = {
  css,
  figma,
  graphql,
  html,
  mongodb,
  node,
};



export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Skills and Experience</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img src={skillImages[skill.imageSrc]} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <ul className={styles.history}>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={styles.historyItem}>
                <img
                  src={historyImages[historyItem.imageSrc]}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                  <ul>
                    {historyItem.experiences.map((experience, id) => {
                      return <li key={id}>{experience}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};