import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Stages } from "../Stages/Stages";

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stages" element={<Stages />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
