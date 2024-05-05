import "./Event.css";
import { useState } from "react";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";
import { MyEvent } from "../../interfaces/interfaces";

export const Events: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const roleName = useUserInfoStore((state) => state.roleName);
  const [events, setEvents] = useState<MyEvent[]>([]);

  return (
    <>
      <div className="eventsDesign">

      </div>
    </>
  );
};
