import { useNavigate } from "react-router-dom";
import { SVGReturn } from "../../common/SVGReturn/SVGReturn";
import "./DetailUser.css";
import { useDetailUserStore } from "../../store/detailUsers";
import { UserCard } from "../../common/UserCard/UserCard";
import { useState } from "react";

export const DetailUser: React.FC = () => {
  const navigate = useNavigate();
  const detailedUser = useDetailUserStore((state) => state.detailedUser);
  const [showUserCard, setShowUserCard] = useState<number>(1);

  const changeMember = (member: number) => {
    setShowUserCard(member);
  };

  return (
    <div className="detailUserDesign">
      <div className="detailName">
        <div className="goBackDetail">
          <div className="goBackLink" onClick={() => navigate(-1)}>
            <SVGReturn color="var(--tertiary-color)" />
          </div>
          Volver
        </div>
        <div>
          {detailedUser.firstName} {detailedUser.lastName}{" "}
          {detailedUser.secondLastName}
        </div>
        <div className="goBackDetail"></div>
      </div>
      {detailedUser.roles.includes("student") ||
      detailedUser.roles.includes("parent") ? (
        detailedUser.roles.includes("parent") ? (
          <div className="familyList">
            <div className="familyMembers" onClick={() => changeMember(1)}>
              Padre/Madre
            </div>
            {detailedUser.parentid.map((parent, index) => (
              <div className="familyMembers" key={`child${index}`} onClick={() => changeMember(index+2)}>
                {parent.student.firstName} {parent.student.lastName}
              </div>
            ))}
          </div>
        ) : (
          <div className="familyList">
            <div className="familyMembers">
              {detailedUser.firstName} {detailedUser.lastName}
            </div>
            <div className="familyMembers">Tutor 1</div>
            <div className="familyMembers">Tutor 2</div>
          </div>
        )
      ) : null}
      <div className="detailUserButtons"></div>
      <UserCard
        id={detailedUser.id}
        firstName={detailedUser.firstName}
        lastName={detailedUser.lastName}
        secondLastName={detailedUser.secondLastName}
        address={detailedUser.address}
        birthday={detailedUser.birthday}
        email={detailedUser.email}
        phone={detailedUser.phone}
        profilePhoto={detailedUser.profilePhoto}
        roles={detailedUser.roles}
        className={showUserCard === 1 ? "" : "userCardHidden"}
      />
      {detailedUser.parentid.map((parent, index) => (
          <UserCard
            key={`childCard${index}`}
            id={parent.student.id}
            firstName={parent.student.firstName}
            lastName={parent.student.lastName}
            secondLastName={parent.student.secondLastName}
            address={parent.student.address}
            birthday={parent.student.birthday}
            email={parent.student.email}
            phone={parent.student.phone}
            profilePhoto={parent.student.profilePhoto}
            roles={parent.student.roles}
            className={showUserCard === index + 2 ? "" : "userCardHidden"}
          />
      ))}
    </div>
  );
};
