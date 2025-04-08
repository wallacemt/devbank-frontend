import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { LoginScreen } from "./screens/Auth/LoginScreen";
import { RegisterScreen } from "./screens/Auth/RegisterScreen";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
