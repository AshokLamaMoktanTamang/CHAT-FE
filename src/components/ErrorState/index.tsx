import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

export enum ErrorStateType {
  PAGENOTEXIST = "Page-not-found",
  SERVERERROR = "Server-error",
}

export interface ErrorStateProps {
  type?: ErrorStateType;
  homeRoutePath?: string;
}

const ErrorState: FC<ErrorStateProps> = ({
  type = ErrorStateType.PAGENOTEXIST,
  homeRoutePath,
}) => {
  const images = [
    {
      type: ErrorStateType.PAGENOTEXIST,
      text: "Panda is Hibernating! 💤",
    },
    {
      type: ErrorStateType.SERVERERROR,
      text: "Oops! Panda's Taking a Break! 🌿",
    },
  ];

  const imageToUse = images.find((item) => item.type === type);
  return (
    <div className={style.emptyErrorWrapper}>
      <div className={style.emptyErrorWrapper__image}></div>
      <div className={style.emptyErrorWrapper__descrption}>
        <div className={style.emptyErrorWrapper__title}>
          <p>{imageToUse?.text}</p>
        </div>
        <div>
          <p>
            Verify the URL or navigate to the{" "}
            <p className={style.emptyErrorWrapper__link}>
              <Link to={homeRoutePath || "home"} className={style.link}>
                Home Page.
              </Link>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
