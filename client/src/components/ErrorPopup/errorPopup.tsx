import { useAppDispatch, useAppSelector } from "../../store";
import { setErrorTextToPopUp } from "../../store/reducers/reducer";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./ErrorPopup.css";

export const ErrorPopup = ({ time }: { time: number }) => {
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const errorText = useAppSelector((state) => state.textErrorPopUp);

  useEffect(() => {
    if (errorText) {
      setActive(true);
      const timer = setTimeout(handleClosePopup, time);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorText, time]);

  const handleClosePopup = () => {
    setActive(false);
  };

  return (
    <div
      onTransitionEnd={() => {
        if (!active) {
          dispatch(setErrorTextToPopUp(null));
        }
      }}
      className={`popup ${active ? "popup_active" : ""}`}
    >
      <div className="popup__content">
        <div className="popup__icons">
          <ExclamationCircleOutlined
            className="popup__info_icon"
            style={{ color: "red" }}
          />
          <CloseCircleOutlined
            onClick={() => handleClosePopup()}
            className="popup__close_icon"
          />
        </div>
        <p className="popup__text">{errorText || " "}</p>
      </div>
    </div>
  );
};
