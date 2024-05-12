import { useEffect, useState } from "react";
import "./Notifications.css";
import { useAuthStore } from "../../store/credentials";
import { isTokenExpired } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { NotificationI, SetNotification } from "../../interfaces/interfaces";
import { getNotifications } from "../../services/ApiCalls";
import dayjs from "dayjs";
import { Modal } from "../../common/Modal/Modal";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { useUserInfoStore } from "../../store/userData";

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const authorId = useAuthStore((state) => state.id);
  const schoolId = useAuthStore((state) => state.schoolId);
  const userCourseId = useUserInfoStore((state) => state.courseId);
  const userStageId = useUserInfoStore((state) => state.stageId);
  const userRoleArray = useAuthStore((state) => state.roles);
  const logout = useAuthStore((state) => state.logout);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createNotificationOpen, setCreateNotificationOpen] = useState(false);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationI[]>([]);
  const [detailNotification, setDetailNotification] =
    useState<NotificationI | null>(null);
  const [newNotification, setNewNotification] = useState<SetNotification>({
    title: "",
    message: "",
    publisherId: authorId,
    stageId: 0,
    courseId: 0,
    schoolId: schoolId,
  });

  useEffect(() => {
    if (token === "" || isTokenExpired(token)) {
      logout();
      navigate("/");
    }
    if (!firstFetch) {
      fetchNotifications();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [userCourseId, userStageId]);

  const fetchNotifications = async () => {
    try {
      let query = `?schoolId=${schoolId}`;
      if (userCourseId !== 0) query += `&courseId=${userCourseId}`;
      if (userStageId !== 0) query += `&stageId=${userStageId}`;
      const response = await getNotifications(token, query);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNotification({
      ...newNotification,
      [e.target.name]: e.target.value,
    });
  };

  const createNotification = async () => {
    toggleCreateNotifationModal();
  };

  const toggleCreateNotifationModal = () => {
    setCreateNotificationOpen(!createNotificationOpen);
  };

  const sendNotification = async (notification: NotificationI) => {
    setDetailNotification(notification);
    toggleDetailModal();
  };

  const toggleDetailModal = () => {
    setDetailOpen(!detailOpen);
  };

  return (
    <div className="notificationsDesign">
      {(userRoleArray.includes("admin") ||
        userRoleArray.includes("teacher") ||
        userRoleArray.includes("personal")) && (
        <>
          <div
            className="addNotification"
            onClick={toggleCreateNotifationModal}
          >
            <SVGAdd color="var(--tertiary-color)" />
          </div>
          <Modal
            isOpen={createNotificationOpen}
            toggleModal={toggleCreateNotifationModal}
          >
            <div className="addStage">
              <MyInput
                type={"text"}
                name={"title"}
                value={newNotification.title || ""}
                placeholder={"Titulo de la notificación"}
                disabled={false}
                onChangeFunction={inputHandler}
                className={"loginInputDesign marginTopBottom"}
              />
              <MyInput
                type={"text"}
                name={"message"}
                value={newNotification.message || ""}
                placeholder={"Contenido de la notificación"}
                disabled={false}
                onChangeFunction={inputHandler}
                className={"loginInputDesign marginTopBottom"}
              />
              <MyButton
                text="Crear notificación"
                onClickFunction={createNotification}
                className="button loginButtonDesign marginTopBottom"
              />
            </div>
          </Modal>
        </>
      )}
      {!firstFetch
        ? "Cargando Notificaciones..."
        : firstFetch && notifications.length === 0
        ? "No hay notificaciones"
        : notifications.map((notification, index) => (
            <div
              key={index}
              className="notificationCard"
              onClick={() => sendNotification(notification)}
            >
              <div className="notificationDate">
                {dayjs(notification.createdAt).format("DD/MM/YYYY")}
              </div>
              <div className="notificationTitle">
                <h3>{notification.title}</h3>
              </div>
              <div className="notificationPublisher">
                {notification.publisher.firstName}{" "}
                {notification.publisher.lastName}
              </div>
            </div>
          ))}
      <Modal isOpen={detailOpen} toggleModal={toggleDetailModal}>
        {detailNotification === null ? (
          "Cargando Notificación..."
        ) : (
          <>
            <h2>{detailNotification.title}</h2>
            <div className="content">{detailNotification.message}</div>
            <MyButton
              text="Cerrar"
              onClickFunction={toggleDetailModal}
              className="button marginTopBottom"
            />
          </>
        )}
      </Modal>
    </div>
  );
};
