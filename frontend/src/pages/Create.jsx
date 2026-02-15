import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Create = () => {
  const [roomName, setRoomName] = React.useState("");
  const [activeTime, setActiveTime] = React.useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!roomName.trim() || !activeTime) {
      return alert("Data fields are empty");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/rooms/create`,
      { roomName: roomName.trim(), activeTime }
    );

    if (response.status === 200) {
      alert("Room created successfully");
      return navigate(`/chat/${roomName.trim()}`);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#0A0F14]">
      <div className="text-white rounded-2xl w-1/3  p-5 flex flex-col space-y-3 bg-[#161B26]">
        <p className="font-semibold text-3xl tracking-tight text-center">Create a room</p>
        <div className="flex flex-col gap-3">
          <label htmlFor="roomname" className="tracking-wider text-sm">
            Room Name
          </label>
          <input
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            id="roomname"
            type="text"
            className="p-2 rounded-lg active:outline-none focus:outline-none bg-[#0E1014] text-white"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="tracking-wider text-sm" htmlFor="timeselect">
            Delete In:
          </label>
          <select
            value={activeTime}
            onChange={(e) => {
              setActiveTime(e.target.value);
            }}
            id="timeselect"
            className="bg-[#0E1014] p-2 rounded-lg"
          >
            <option value="">---------SELECT AN OPTION---------</option>
            <option value="30M">30 Minutes</option>
            <option value="60M">1 Hour</option>
            <option value="90M">1 Hour 30 Minutes</option>
            <option value="120M">2 Hours</option>
          </select>
        </div>
        <button
          onClick={submit}
          className="bg-blue-600 mt-4 cursor-pointer rounded-lg p-3"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Create;
