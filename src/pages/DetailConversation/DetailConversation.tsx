import "./DetailConversation.css";
import { useNavigate } from "react-router-dom";
import { SVGReturn } from "../../common/SVGReturn/SVGReturn";
import { useChatStore } from "../../store/detailChat";
import { useAuthStore } from "../../store/credentials";
import { useEffect, useState } from "react";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { Message, newMessage, seenMessages } from "../../interfaces/interfaces";
import { createMessage, updateSeenMessages } from "../../services/ApiCalls";

export const DetailConversation: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.id);
  const unseenCount = useChatStore((state) => state.unseenCount);
  const setUnseenCount = useChatStore((state) => state.setUnseenCount);
  const authorName = useChatStore((state) => state.authorName);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const [nMessage, setNMessage] = useState<Message>({
    newMessage: "",
    authorId: userId,
    receiverId: 0,
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    let receiver: number = 0;
    if (messages.length > 0) {
      if (messages[0].authorId === userId) {
        receiver = messages[0].receiverId;
      } else {
        receiver = messages[0].authorId;
      }
    } else {
      receiver = unseenCount;
      setUnseenCount(0);
    }
    setNMessage((prevState) => ({
      ...prevState,
      receiverId: receiver,
    }));
  }, []);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    setSeenMessages();
  }, [nMessage]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNMessage((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const setSeenMessages = async () => {
    try {
      const updateMessagesFrom: seenMessages = {
        userId1: nMessage.authorId,
        userId2: nMessage.receiverId,
      };
      const updatedSeen = await updateSeenMessages(token, updateMessagesFrom);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const retrievedMessage = await createMessage(token, nMessage);
      const data = retrievedMessage.data as unknown as newMessage;
      let messageToAdd = {
        id: data.id,
        message: data.message,
        authorId: data.authorId,
        receiverId: data.receiverId,
        seenReceiver: false,
        author: [],
        receiver: [],
      };
      let updatedArray = messages;
      updatedArray.push(messageToAdd);
      setMessages(updatedArray);
      setNMessage((prevState) => ({
        ...prevState,
        newMessage: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conversationDesign">
      <div className="detailName">
        <div className="goBackDetail">
          <div className="goBackLink" onClick={() => navigate(-1)}>
            <SVGReturn color="var(--tertiary-color)" />
          </div>
          Volver
        </div>
        <div>{authorName}</div>
        <div className="goBackDetail"></div>
      </div>
      <div className="conversationDisplay">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div
              className={`messageContent ${
                message.authorId === userId ? "sent" : "received"
              }`}
            >
              <div
                className={`messageAuthor ${
                  message.authorId === userId ? "sentDesign" : "receivedDesign"
                }`}
              >
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="messageInput">
        <MyInput
          type={"text"}
          name={"newMessage"}
          value={nMessage.newMessage || ""}
          placeholder={"Mensaje..."}
          disabled={false}
          onChangeFunction={inputHandler}
          className={"loginInputDesign marginTopBottom"}
        />
        <MyButton
          text="Enviar"
          onClickFunction={sendMessage}
          className="button loginButtonDesign marginTopBottom"
        />
      </div>
    </div>
  );
};
