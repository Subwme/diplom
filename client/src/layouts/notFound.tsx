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
      {user?.isAdmin || (
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 16,
          }}
        >
          {user ? "Go back to main User!" : "Go back to login User!"}
          {" "}
          {user ? <Link to="/">Main</Link> : <Link to="/auth">Login</Link>}
        </div>
      )}
      {user?.isAdmin && (
        <Link
          style={{
            display:"block",
            textAlign: "center",
            marginTop: 10,
            fontSize: 16,
          }}
          to="/admin"
        >
          Back to AdminPanel
        </Link>
      )}
    </>
  );
};
