import React from 'react';
import styles from './MissionSection.module.css'; // Importando o CSS módulo
import mulherImg from '../../../../utils/assets/site-institucional/sobrenos/mulhercomcachorro.png';
import waveImg from '../../../../utils/assets/site-institucional/sobrenos/wavesobrenos.svg';

const MissionSection = () => {
    return (
        <div className={styles.missionSection}>
            <img src={waveImg} alt="Wave" className={styles.wave} />
            <div className={styles.content}>
                <div className={styles.text}>
                    <h2>Nossa missão é...</h2>
                    <p>
                        <strong>Facilitar</strong> e <strong>aprimorar</strong> a <strong>gestão de serviços em petshops</strong>,
                        proporcionando aos donos de pets uma experiência conveniente e eficaz. Nosso compromisso é garantir que
                        cada interação, desde o agendamento até o atendimento, <strong>seja simples, intuitiva e centrada no bem-estar dos animais</strong>.
                    </p>
                </div>
                <img src={mulherImg} alt="Mulher com cachorro" className={styles.woman} />
            </div>
        </div>
    );
};

export default MissionSection;
