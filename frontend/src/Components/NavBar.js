import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./NavBar.css";

const NavBar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar">
      {isAuthenticated && (
        <span className="userName">Welcome, {user.name}</span>
      )}
      {isAuthenticated ? (
        <>
          <button
            className="standard-button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </>
      ) : (
        <button
          className="standard-button"
          onClick={() =>
            loginWithRedirect(() => {
              loginWithRedirect({
                screen_hint: "form",
                appState: {
                  returnTo: "/",
                },
              });
            })
          }
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default NavBar;
