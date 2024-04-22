import { HeaderLink } from "../HeaderLink/HeaderLink";
import "./Header.css";

export function Header() {

  return (
    <div className="headerDesign">
        <div>APP School</div>
        <HeaderLink title="Home" destination="/" />
        <HeaderLink title="Register" destination="/register" />
    </div>
  );
}
