// TeamSection.jsx
import React from "react";
import styles from "./TeamSection.module.css";

// Fotos (substitua pelos caminhos corretos para cada membro)
import dani from "../../../../utils/assets/site-institucional/sobrenos/dani.png";
import samuel from "../../../../utils/assets/site-institucional/sobrenos/samuel.png"; // Supondo que haja uma imagem chamada 'samuel.png'
import guilherme from "../../../../utils/assets/site-institucional/sobrenos/guilherme.png"; // Supondo que haja uma imagem chamada 'guilherme.png'
import isaac from "../../../../utils/assets/site-institucional/sobrenos/isaac.png"; // Supondo que haja uma imagem chamada 'isaac.png'
import leonardo from "../../../../utils/assets/site-institucional/sobrenos/leonardo.png"; // Supondo que haja uma imagem chamada 'leonardo.png'
import beatriz from "../../../../utils/assets/site-institucional/sobrenos/beatriz.png"; // Supondo que haja uma imagem chamada 'beatriz.png'

const TeamSection = () => {
  const teamMembers = [
    { name: "Dani", role: "Desenvolvedora full-stack", photo: dani },
    { name: "Samuel", role: "Desenvolvedor front-end", photo: samuel },
    { name: "Guilherme", role: "Desenvolvedor back-end", photo: guilherme },
    { name: "Isaac", role: "Desenvolvedor front-end", photo: isaac },
    { name: "Leonardo", role: "Product Owner e Dev Front-end", photo: leonardo },
    { name: "Beatriz", role: "Scrum Master e Dev Front-end", photo: beatriz },
  ];

  return (
    <div className={styles.teamSection}>
      <h2>Conheça Nossa Equipe</h2>
      <h4>Unimos tecnologia de ponta com uma experiência personalizada e acessível</h4>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamMember}>
            <img src={member.photo} alt={member.name} className={styles.photo} />
            <div className={styles.info}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
