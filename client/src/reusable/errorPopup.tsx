import { useAppDispatch, useAppSelector } from "../store";
import { setErrorTextToPopUp } from "../store/reducers/reducer";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const ErrorPopup = ({ timer }: { timer: number }) => {
  const dispatch = useAppDispatch();
  const isErrorTextInPopup = useAppSelector((state) => state.textErrorPopUp);

  const handleClosePopup = () => {
    dispatch(setErrorTextToPopUp(null));
  };

  if (isErrorTextInPopup) {
    setTimeout(() => {
      dispatch(setErrorTextToPopUp(null));
    }, timer);
  }

  return (
    <div
      className={`popup ${
        isErrorTextInPopup ? "popup_active " : "popup_inactive"
      }`}
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
        <p className="popup__text">{isErrorTextInPopup}</p>
      </div>
    </div>
  );
};
