import "./DetailConversation.css";
import { useNavigate } from "react-router-dom";
import { SVGReturn } from "../../common/SVGReturn/SVGReturn";
import { useChatStore } from "../../store/detailChat";
import { useAuthStore } from "../../store/credentials";

export const DetailConversation: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.id);
  const authorName = useChatStore((state) => state.authorName);
  const messages = useChatStore((state) => state.messages);

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
      <div className="messageInput"></div>
    </div>
  );
};
