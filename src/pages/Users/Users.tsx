import { NativeSelect } from "@mantine/core";
import "./Users.css";
import { MyInput } from "../../common/MyInput/MyInput";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/credentials";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../../store/userData";
import { getUsers } from "../../services/ApiCalls";
import { useDetailUserStore } from "../../store/detailUsers";

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const roleName = useUserInfoStore((state) => state.roleName);
  const setDetailedUser = useDetailUserStore((state) => state.setDetailedUser);
  const [users, setUsers] = useState<any[]>([]);
  const [userFilter, setUserFilter] = useState({
    firstNameFilter: "",
    lastNameFilter: "",
    roleNameFilter: "",
  });

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
    if (roleName !== "admin" && roleName !== "super_admin") {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (
      userFilter.firstNameFilter !== "" ||
      userFilter.lastNameFilter !== "" ||
      userFilter.roleNameFilter !== ""
    ) {
      const searching = setTimeout(() => {
        fetchUsers();
      }, 350);
      return () => clearTimeout(searching);
    } else {
      setUsers([]);
    }
  }, [userFilter]);

  useEffect(() => {
  }, [users]);

  const fetchUsers = async () => {
    try {
      const queryFilter = `?schoolId=${schoolId}&roleName=${userFilter.roleNameFilter}&firstName=${userFilter.firstNameFilter}`;
      const allUsers = await getUsers(token, queryFilter);
      setUsers(allUsers.data);
    } catch (error) {
      console.log("Error fetching users");
    }
  };

  const eventHandler = (value: string, name: string) => {
    setUserFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setDetail = (user: any) => {
    console.log("User", user);
    setDetailedUser(user);
    navigate("/detailuser");
  };

  return (
    <div className="usersDesign">
        <div className="userTitle">Users</div>
      <div className="userFilters">
        <div className="userFilter">
          <NativeSelect
            name="roleNameFilter"
            value={userFilter.roleNameFilter || ""}
            style={{ margin: "1em" }}
            onChange={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            data={["", "teacher", "personal", "parent", "student"]}
          />
        </div>
        <div className="userFilter">
          <MyInput
            type={"text"}
            name={"firstNameFilter"}
            value={userFilter.firstNameFilter || ""}
            placeholder={"Nombre"}
            disabled={false}
            onChangeFunction={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            className={"userSearchInputDesign"}
          />
        </div>
        <div className="userFilter">
          <MyInput
            type={"text"}
            name={"lastNameFilter"}
            value={userFilter.lastNameFilter || ""}
            placeholder={"Apellido"}
            disabled={false}
            onChangeFunction={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            className={"userSearchInputDesign"}
          />
        </div>
      </div>
      <div className="usersList">
        <div className="userSearchCard">
            <div className="userCardName">Name</div>
            <div className="userCardEmail">Email</div>
            <div className="userCardRole">Role</div>
        </div>
            {users.length > 0 
            ? (
                users.map((user) => (
                  <div key={user.id} className="userSearchCard" onClick={() => setDetail(user)}>
                    <div className="userCardName">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="userCardEmail">{user.email}</div>
                    <div className="userCardRole">{user.roles.map((user_role: string ) => user_role).join(" ")}</div>
                  </div>
                ))
            ) : 
            <div className="noUsersFound">No users found</div>}
        </div>
    </div>
  );
};
