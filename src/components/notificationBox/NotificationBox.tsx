import { useEffect, useState } from "react";
import "./NotificationBox.css";

type NotificationBoxProps = {
  password: string;
};

const NotificationBox = ({ password }: NotificationBoxProps) => {
  const [width, setWidth] = useState(5000);
  const [isPause, setIsPause] = useState(true);
  useEffect(() => {
    let progress: number;
    if (password) {
      if (!isPause) {
        return;
      }
      progress = setInterval(() => {
        setWidth((prev) => prev - 10);
      }, 10);
    }

    return () => {
      clearInterval(progress);
    };
  }, [width, isPause, password]);

  return (
    <div
      onMouseEnter={() => setIsPause(false)}
      onMouseLeave={() => setIsPause(true)}
      className="noti-container"
    >
      <div className="noti-content">
        Password created successfully: {password}
      </div>
      {password && (
        <div style={{ width: `${width / 50}%` }} className="progress-bar"></div>
      )}
    </div>
  );
};

export default NotificationBox;
