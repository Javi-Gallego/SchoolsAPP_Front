import "./Messages.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/credentials";
import { getMessages } from "../../services/ApiCalls";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { Conversation } from "../../interfaces/interfaces";
import { useChatStore } from "../../store/detailChat";
import { useNavigate } from "react-router-dom";

export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const userId = useAuthStore((state) => state.id);
  const setAuthorName = useChatStore((state) => state.setAuthorName);
  const setReceiverName = useChatStore((state) => state.setReceiverName);
  const setMessages = useChatStore((state) => state.setMessages);
  const setUnseenCount = useChatStore((state) => state.setUnseenCount);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [messages, setMessagesArray] = useState<any[]>([]);

  useEffect(() => {
    if (!firstFetch) {
      fetchMessages();
      setFirstFetch(true);
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(token);
      setMessagesArray(response.data);
    } catch (error) {}
  };

  // const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setStageName((prevState) => ({
  //     ...prevState,
  //     name: e.target.value,
  //   }));
  // };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const openConversation = (chat: Conversation) => {
    setAuthorName(chat.authorName);
    setReceiverName(chat.receiverName);
    setMessages(chat.messages);
    setUnseenCount(chat.unseenCount);
    console.log("message: ", chat);
    navigate("/detailConversation");
  };

  return (
    <>
      <div className="messagesDesign">
        {!firstFetch ? (
          <div>Loading...</div>
        ) : messages.length === 0 ? (
          <div>No hay eventos</div>
        ) : (
          Array.isArray(messages) &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
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
                <div className="unreadMessages">{message.unseenCount}</div>
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
