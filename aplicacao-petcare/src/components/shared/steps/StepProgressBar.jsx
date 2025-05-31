import { FaCheckCircle } from "react-icons/fa";
import styles from "./StepProgressBar.module.css"; 

const StepProgressBar = ({ steps, currentStep }) => {
  const progressWidth = `${(currentStep / steps.length) * 100}%`;
  const isComplete = currentStep === steps.length;

  return (
    <div className={styles.containerProgress}>
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: progressWidth }}
          />
        </div>
        {isComplete && <FaCheckCircle className={styles.completeIcon} size={20} />}
      </div>
    </div>
  );
};

export default StepProgressBar;
