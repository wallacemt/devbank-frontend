import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { LoginScreen } from "./screens/Auth/LoginScreen";
import { RegisterScreen } from "./screens/Auth/RegisterScreen";

export const RoutesApp = () => {
  return (
   
      <Routes>
        <Route path="sign-in" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
   
  );
};
