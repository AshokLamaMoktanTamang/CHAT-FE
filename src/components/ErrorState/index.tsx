import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";

import style from "./style.module.scss";
import { PRIVATE_ROUTES } from "@/utils/constants";

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
  const navigate = useNavigate();

  const images = [
    {
      type: ErrorStateType.PAGENOTEXIST,
      text: "Page not found! 💤",
    },
    {
      type: ErrorStateType.SERVERERROR,
      text: "Server Error! 🌿",
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
              <Button
                onClick={() => navigate(homeRoutePath || PRIVATE_ROUTES.home)}
                variant={"link"}
                className="w-full"
              >
                Home Page.
              </Button>
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
