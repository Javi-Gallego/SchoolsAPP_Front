import "./UserCard.css";
import dayjs from "dayjs";
import "dayjs/locale/es";

interface userCardProps {
  id: number;
  firstName: string;
  lastName: string;
  secondLastName: string;
  address: string;
  birthday: Date;
  email: string;
  phone: number | null;
  profilePhoto: string;
  roles: string[];
  className: string;
}

export const UserCard: React.FC<userCardProps> = ({
  firstName,
  lastName,
  secondLastName,
  address,
  birthday,
  email,
  phone,
  profilePhoto,
  roles,
  className,
}) => {
  dayjs.locale("es");
  // const rootUrl = "http://localhost:4000";
  const rootUrl = "https://schoolsapp-production.up.railway.app"
  const birthdayDate = dayjs(birthday).format("DD/MM/YYYY");
  return (
    <div className={`userCardDesign ${className}`}>
      <div className="userCardPhoto">
        <img src={`${rootUrl}${profilePhoto}`} alt="profilePhoto"></img>
      </div>
      <div className="userCardData">
        <div className="userCardTitle">Datos del usuario</div>
        <div className="userCardName">Nombre:</div>
        <div className="userCardContent">{firstName}</div>
        <div className="userCardName">1er Apellido:</div>
        <div className="userCardContent">{lastName}</div>
        <div className="userCardName">2do Apellido:</div>
        <div className="userCardContent">{secondLastName}</div>
        <div className="userCardName">Teléfono:</div>
        <div className="userCardContent">{phone}</div>
        <div className="userCardName">Email:</div>
        <div className="userCardContent">{email}</div>
        <div className="userCardName">Dirección:</div>
        <div className="userCardContent">{address}</div>
        <div className="userCardName">Cumpleaños:</div>
        <div className="userCardContent">{birthdayDate}</div>
        <div className="userCardName">Roles:</div>
        <div className="userCardContent">{roles ? roles.join(" ") : ""}</div>
      </div>
    </div>
  );
};
