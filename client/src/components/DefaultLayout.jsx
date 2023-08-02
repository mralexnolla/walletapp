/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((store) => store.user.user);

  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-wifi-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-wifi-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "users",
      icon: <i className="ri-user-settings-line"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i className="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const menuToRender = user.isAdmin ? adminMenu : userMenu;
   
  return (
    <div className="layout">
      {/** the side bar */}
      <div className="sidebar">
        <div className="menu">
          {menuToRender.map((item, idx) => {
            const isActive = window.location.pathname === item.path;
            //console.log(window.location.pathname);

            return (
              <div
                key={item + `${idx}`}
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && <h1 className="text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>

      {/** The body  */}
      <div className="body">
        {/** Body header */}
        <div className="header flex justify-between align-center">
          <div>
            {collapsed && (
              <i
                className="ri-menu-2-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
            {!collapsed && (
              <i 
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
          </div>

          <div>
            <h1 className="text-xl">RAPIDREQUEST</h1>
          </div>

          <div>
            <h1 className="text-sm underline">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>

        {/** Body Content */}
        <div className="content"> {children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
