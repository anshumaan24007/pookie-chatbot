import ChatBot from "./ChatBot";
import { useState } from "react";
import Pookie from "./ducky.png";

export default function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="main">
        <img
          src={Pookie}
          className="chatbot-mascot"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`chatbot-container ${
            toggle ? "chatbot-enter-active" : "chatbot-exit-active"
          }`}
        >
          {toggle && <ChatBot />}
        </div>
      </div>
    </>
  );
}
