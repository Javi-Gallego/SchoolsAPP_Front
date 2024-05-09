import "./Messages.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/credentials";
import { getMessages, getUsers } from "../../services/ApiCalls";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import {
  Conversation,
  querySearchUsersChat,
} from "../../interfaces/interfaces";
import { useChatStore } from "../../store/detailChat";
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../common/MyInput/MyInput";
import { useUserInfoStore } from "../../store/userData";
import { isTokenExpired } from "../../utils/functions";

export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const userId = useAuthStore((state) => state.id);
  const roleName = useUserInfoStore((state) => state.roleName);
  const userName = useAuthStore((state) => state.firstName);
  const setAuthorName = useChatStore((state) => state.setAuthorName);
  const setReceiverName = useChatStore((state) => state.setReceiverName);
  const setMessages = useChatStore((state) => state.setMessages);
  const setUnseenCount = useChatStore((state) => state.setUnseenCount);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [messages, setMessagesArray] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [queryRoleName, setQueryRoleName] = useState<string>(
    "teacher,personal,student,parent"
  );
  const [query, setQuery] = useState<querySearchUsersChat>({
    firstName: "",
    lastName: "",
    roleId: [0],
  });

  useEffect(() => {
    if(token === "" || isTokenExpired(token)){
      logout();
      navigate("/");
    }
    if (roleName === "parent" || roleName === "student") {
      setQueryRoleName("teacher,personal");
    }
    if (!firstFetch) {
      fetchMessages();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    messages.forEach((message, firstIndex) => {
      message.messages.forEach((msg: any, secondIndex: any) => {});
    });
  }, [messages]);

  useEffect(() => {
    if (query.firstName !== "") {
      const searching = setTimeout(() => {
        fetchUsers();
      }, 350);
      return () => clearTimeout(searching);
    } else {
      setUsers([]);
    }
  }, [query.firstName]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(token);
      setMessagesArray(response.data);
    } catch (error) {}
  };

  const fetchUsers = async () => {
    try {
      const queryFilter = `?schoolId=${schoolId}&roleName=teacher&firstName=${query.firstName}`;
      const allUsers = await getUsers(token, queryFilter);
      setUsers(allUsers.data);
    } catch (error) {
      console.log("Error fetching users");
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery((prevState) => ({
      ...prevState,
      firstName: e.target.value,
    }));
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const openConversation = (chat: Conversation) => {
    setAuthorName(chat.authorName);
    setReceiverName(chat.receiverName);
    setMessages(chat.messages);
    setUnseenCount(chat.unseenCount);
    navigate("/detailConversation");
  };

  const goToChat = (user: any) => {
    messages.forEach((message, firstIndex) => {
      message.messages.forEach((msg: any, secondIndex: any) => {
        if (user.id === msg.author.id || user.id === msg.receiver.id) {
          setAuthorName(messages[firstIndex].authorName);
          setReceiverName(messages[firstIndex].receiverName);
          setMessages(messages[firstIndex].messages);
          setUnseenCount(messages[firstIndex].unseenCount);
          navigate("/detailConversation");
        }
      });
    });
    setAuthorName(`${user.firstName} ${user.lastName}`);
    setReceiverName(userName);
    setMessages([]);
    setUnseenCount(user.id);
    navigate("/detailConversation");
  };

  return (
    <>
      <div className="messagesDesign">
        <MyInput
          type={"text"}
          name={"fisrtName"}
          value={query.firstName || ""}
          placeholder={"Nombre usuario"}
          disabled={false}
          onChangeFunction={inputHandler}
          className={"loginInputDesign marginTopBottom"}
        />
        {users && users.length > 0
          ? Array.isArray(users) &&
            users.length > 0 &&
            users.map((user, index) => (
              <div
                key={`user${index}`}
                className="listNames"
                onClick={() => goToChat(user)}
              >
                {user.firstName} {user.lastName}
              </div>
            ))
          : null}
        {!firstFetch ? (
          <div>Loading...</div>
        ) : messages.length === 0 ? (
          <div>No hay eventos</div>
        ) : (
          Array.isArray(messages) &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={`message${index}`}
              className="chatCard"
              onClick={() => openConversation(message)}
            >
              <div className="chatBorder"></div>
              {message.messages[0].author.id === userId ? null : (
                <div className="chatName">
                  {message.messages[0].author.firstName}{" "}
                  {message.messages[0].author.lastName}
                </div>
              )}
              {message.messages[0].receiver.id === userId ? null : (
                <div className="chatName">
                  {message.messages[0].receiver.firstName}{" "}
                  {message.messages[0].receiver.lastName}
                </div>
              )}
              <div className="chatBorder">
                {message.unseenCount === 0 ? null : (
                  <div className="unreadMessages">{message.unseenCount}</div>
                )}
              </div>
            </div>
          ))
        )}
        <div className="addChat" onClick={toggleModal}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
      </div>
    </>
  );
};
