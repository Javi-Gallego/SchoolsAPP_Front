import { useAuthStore } from "../../store/credentials";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import "./Header.css";

export function Header() {
  const userName = useAuthStore((state) => state.firstName);
  const profilePhoto = useAuthStore((state) => state.profilePhoto);
  return (
    <div className="headerDesign">
        <div>{userName}</div>
        <img src="http://localhost:4000/uploads/profile/userphoto.png" alt="profile" />
        <HeaderLink title="Home" destination="/home" />
        <HeaderLink title="Register" destination="/register" />
    </div>
  );
}
