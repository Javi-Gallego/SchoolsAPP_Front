import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Stages } from "../Stages/Stages";
import { Courses } from "../Courses/Courses";
import { Subjects } from "../Subjects/Subjects";
import { DetailCourse } from "../DetailCourse/DetailCourse";
import { Calendar } from "../Calendar/Calendar";
import { Events } from "../Event/Event";
import { Messages } from "../Messages/Messages";
import { DetailConversation } from "../DetailConversation/DetailConversation";

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stages" element={<Stages />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/detailcourse" element={<DetailCourse />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/events" element={<Events />} />
      <Route path="/register" element={<Register />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/detailconversation" element={<DetailConversation />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
