import { useEffect, useState } from "react";
import "./NotificationBox.css";

type NotificationBoxProps = {
  password: string;
};

const NotificationBox = ({ password }: NotificationBoxProps) => {
  const [width, setWidth] = useState(5000);
  const [isPause, setIsPause] = useState(true);
  const [isShow, setIsShow] = useState(false);
  console.log(width);
  useEffect(() => {
    let progress: number;
    if (password) {
      setIsShow(true);
      if (!isPause) {
        return;
      }

      progress = setInterval(() => {
        if (width === 0) {
          setIsShow(false);
          return clearInterval(progress);
        }
        setWidth((prev) => prev - 10);
      }, 10);
    }

    return () => {
      clearInterval(progress);
    };
  }, [width, isPause, password]);

  return (
    isShow && (
      <div
        onMouseEnter={() => setIsPause(false)}
        onMouseLeave={() => setIsPause(true)}
        className="noti-container"
      >
        <div className="noti-content">
          Password created successfully: {password}
        </div>
        {password && (
          <div
            style={{ width: `${width / 50}%` }}
            className="progress-bar"
          ></div>
        )}
      </div>
    )
  );
};

export default NotificationBox;
