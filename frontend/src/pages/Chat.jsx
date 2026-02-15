import { useEffect, useState, useRef } from "react";
import { useSocket } from "../sockets/socketProvider.jsx";
import { useParams } from "react-router";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router";

const Chat = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");
  const userId = useRef("");
  const params = useParams();

  const generateRandomID = () => {
    if (localStorage.getItem(params.roomId)) {
      userId.current = localStorage.getItem(params.roomId);
      return;
    }
    const min = 100000;
    const max = 999999;

    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    userId.current = "Anon-" + random.toString();

    localStorage.setItem(params.roomId, userId.current);
  };

  useEffect(() => {
    const loadRoomMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/rooms/${params.roomId}`
        );
        setMessages(response.data?.data?.messages || []);
      } catch {
        alert("Room is not available anymore. Please create a new one.");
        navigate("/create");
      }
    };

    generateRandomID();
    setActiveUsers((prev) => [...new Set([...prev, userId.current])]);
    socket.emit("join-room", { roomId: params.roomId, userId: userId.current });
    loadRoomMessages();
  }, [navigate, params.roomId, socket]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => {
        return [...prev, data];
      });
    });

    socket.on("active-users", (data) => {
      setActiveUsers(data);
    });

    return () => {
      socket.off("receive-message");
      socket.off("active-users");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!currentMessage.trim()) {
      return;
    }

    const outgoing = { message: currentMessage.trim(), userId: userId.current };

    setMessages((prev) => [...prev, outgoing]);
    socket.emit("send-message", {
      messageData: outgoing,
      roomId: params.roomId,
    });
    setCurrentMessage("");
  };

  const onDelete = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/rooms/delete`,
      { roomName: params.roomId }
    );

    if (response.status === 200) {
      alert("Deleted successfully");
      return navigate("/create");
    }
  };

  return (
    <div className="w-full h-screen bg-[#0A0F14]">
      <div className="max-w-7xl h-full flex mx-auto">
        <div className="w-64 flex flex-col bg-[#1B212D]">
          <p className="text-lg font-bold tracking-wider py-4 text-[#9DA3AF] text-center uppercase">
            Active Members
          </p>
          {activeUsers.map((item, idx) => {
            return (
              <div
                key={idx}
                className="py-4 flex items-start p-2 border-b border-[#282E39]"
              >
                <p className="text-white text-md tracking-tighter">{item}</p>
              </div>
            );
          })}
        </div>
        <div className="flex-grow flex flex-col">
          <div className="gap-2 flex flex-col flex-grow border-b border-r border-l border-[#282E39]">
            <div className="h-12 text-white border-b text-lg font-semibold p-2 flex justify-start items-center border-[#282E39]">
              Room {params.roomId}
            </div>
            <div className="p-2">
              {messages.map((item, idx) => {
                return (
                  <div
                    className={`text-white flex h-12 w-full ${
                      String(item.userId) === userId.current
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={idx}
                  >
                    <p
                      className={`${
                        item.userId === userId.current
                          ? "bg-blue-600"
                          : "bg-[#282E39]"
                      } p-2 min-w-10 text-center text-white rounded-xl`}
                    >
                      {item.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-24 flex justify-center items-center px-2">
            <div className="flex items-center w-full rounded-lg border text-white p-2 focus:outline-none active:outline-none border-[#282E39]">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="resize-none active:outline-none flex-grow focus:outline-none"
                placeholder="Type your message here"
              />
              <button
                onClick={sendMessage}
                className="w-8 h-8 rounded-xl border-[#282E39] cursor-pointer"
                title="send"
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
        <div className="w-64 flex flex-col py-19 items-center border-r border-[#282E39]">
          <button
            onClick={onDelete}
            className="p-4 bg-transparent hover:bg-red-600 hover:text-black tracking-tighter transition-all duration-200 ease-in font-semibold cursor-pointer border border-red-600 text-red-600 rounded-full"
          >
            DELETE IMMEDIATELY!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
