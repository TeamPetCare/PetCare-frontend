import styles from "./Section02.module.css";
import { PiPawPrintFill } from "react-icons/pi";
import imgMulherComGolden from "../../../../utils/assets/site-institucional/aplicativo-petcare/imgMulherComGolden.png"

const Section02 = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["beneficios"]}>
        <div className={styles["item-beneficio"]}>
          <div className={styles["img"]}>
          <img src={imgMulherComGolden}/>
          </div>
        </div>
        <div className={styles["item-beneficio"]}>
          <div>
            <h3>Cuide do seu Pet com Facilidade</h3>
            <PiPawPrintFill style={{width: '60px', height: '80%'}}/>
          </div>  
          <p>Agende serviços, receba lembretes, e acompanhe a saúde do seu pet direto no celular. Tudo em um só lugar, sem complicações. Simplifique o cuidado com o seu bichinho.</p>
        </div>
      </div>
      <div className={styles["beneficios"]} style={{ position: 'relative' , zIndex: '-1', height: '35vh', marginTop: '100px' }}>
      </div>
    </div>
  );
};

export default Section02;
