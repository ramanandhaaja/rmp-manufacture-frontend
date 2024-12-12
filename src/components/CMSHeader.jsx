import React, { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { onSignInSuccess } from "../store/Auth/sessionSlice";
import { setUser } from "../store/Auth/userSlice";

const CMSHeader = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.session);

  useEffect(() => {
    if (!token) {
      const getToken = localStorage.getItem("token");
      const getUser = JSON.parse(localStorage.getItem("user"));
      if (getToken) {
        dispatch(onSignInSuccess({ token: getToken }));
        dispatch(setUser({ user: getUser }));
      }
    }
  }, [dispatch, token]);

  return (
    <div className="max-w-[calc(100%-10px)] mx-auto">
      <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm rounded-bl-lg rounded-br-lg">
        {/* Left section - Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img src="/RMPlogo.png" alt="Royal Medica logo" className="h-8" />
          </div>
          <div className="text-blue-500 font-medium">
            Factory Management System
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative cursor-pointer mr-3">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full font-medium">
              4
            </span>
          </div>

          <Profile />
        </div>
      </header>
    </div>
  );
};

export default CMSHeader;
