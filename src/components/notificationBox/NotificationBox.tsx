import { useEffect, useState } from "react";
import "./NotificationBox.css";

type NotificationBoxProps = {
  password: string;
  content: string;
  lastChild?: string;
};

const NotificationBox = ({
  password,
  lastChild,
  content,
}: NotificationBoxProps) => {
  const [width, setWidth] = useState(5000);
  const [isPause, setIsPause] = useState(true);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let progress: number;
    if (password) {
      setIsShow(true);
      if (!isPause) {
        return;
      }
      progress = setInterval(() => {
        if (width === 0) {
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
        className={`noti-container ${
          password === lastChild ? "last-noti" : "not-last-noti"
        } ${width <= 100 && "slideout"} `}
      >
        <div className="noti-content">
          {content}:<div>{password}</div>
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
