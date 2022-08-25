import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";

const blockStyle = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 0,
  marginBottom: 0,
};

export const NotFound = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div style={{ fontSize: 40, textAlign: "center", marginTop: "5%" }}>
        Ooppsy Doopsy. WATMAN IS HERE
      </div>
      <img
        style={blockStyle}
        src="https://i.imgflip.com/3ig4xt.jpg"
        alt="WATMAN"
      />
      <div
        style={{
          textAlign: "center",
          marginTop: 10,
          fontSize: 16,
        }}
      >
        Go back to {user ? "main Admin!" : "login User!"}{" "}
        {user ? <Link to="/admin">Main</Link> : <Link to="/auth">Login</Link>}
      </div>
    </>
  );
};
