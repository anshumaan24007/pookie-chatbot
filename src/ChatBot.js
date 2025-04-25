import "./styles.css";
import { useState, useEffect } from "react";
import { projectsData } from "./mockData";
import Send from "./send.png";
import LinkedIn from "./image.png";
import Options from "../Options";

const ChatBot = () => {
  const [inp, setInp] = useState("");
  const projects = projectsData;
  const flag = true;
  const types = Array.from(new Set(projects.map((item) => item.type)));

  const projectType = {
    header: "Which kind of projects do you wish to see?",
    options: types,
  };
  const about = {
    header:
      "Pookie is your friendly neighborhood dev, spreading joy with code!",
    options: [
      <a href="https://drive.google.com/file/d/1RDk0T8ka3YFsusw6f1sclh9rBRQZuo6j/view?usp=sharing">
        🔗 Pookie's Resume Link
      </a>,
    ],
  };
  const linkedIn = {
    options: [<img src={LinkedIn} className="icon" />],
    header: "LinkedIn Profile",
  };

  const main_options = {
    options: ["Who is Pookie?", "What does Pookie do?", "Pookie's LinkedIn"],
    header: "What do you wish to explore today?",
  };

  const initial_options = [
    { sender: "bot", content: `Hi! Welcome to my pookies wishes` },
    {
      sender: "bot",
      content: (
        <Options
          header={main_options.header}
          options={main_options.options}
          handleOptions={handleOptions}
        />
      ),
    },
  ];

  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat(initial_options);
  }, []);

  function handleSend() {
    if (inp.trim()) {
      const userMsg = { sender: "user", content: inp };
      const reply = cannedReply(inp.trim());
      const botReply = { sender: "bot", content: reply };
      setChat((prevChat) => [...prevChat, userMsg]);
      setTimeout(() => {
        setChat((prevChat) => [...prevChat, botReply]);
      }, 1000);
      setInp("");
    }
  }

  function cannedReply(selected) {
    if (selected) {
      if (selected === "Return to main options") {
        console.log("return to main options");
        setChat((prevChat) => prevChat.slice(0, -1));
        return {
          options: main_options.options,
        };
      }
      if (selected == "Who is Pookie?") {
        return {
          header: about.header,
          options: about.options,
          back: true,
        };
      } else if (selected == "What does Pookie do?") {
        return {
          header: projectType.header,
          options: projectType.options,
          back: true,
        };
      } else if (selected == "Pookie's LinkedIn") {
        return {
          header: linkedIn.header,
          options: linkedIn.options,
          back: true,
        };
      }
    }

    return "Sorry, I am not able to underastand you at the moment.";
  }

  function handleOptions(selected) {
    setChat((prevChat) => [
      ...prevChat,
      {
        sender: "bot",
        content: <span className="typing">Pookie is typing...</span>,
      },
    ]);

    if (
      main_options.options.includes(selected) ||
      selected == "Return to main options"
    ) {
      setTimeout(() => {
        setChat((prevChat) => prevChat.slice(0, -1));
        setChat((prevChat) => {
          const updated = prevChat.slice(0, -1);
          updated.push({ sender: "user", content: selected });
          return updated;
        });
        const reply = cannedReply(selected);
        if (typeof reply === "object") {
          const newMessages = [
            {
              sender: "bot",
              content: (
                <Options
                  header={reply.header}
                  options={[...reply.options]}
                  handleOptions={handleOptions}
                />
              ),
            },
          ];

          if (reply.back) {
            newMessages.push({
              sender: "bot",
              content: (
                <div className="option-container">
                  <div
                    className="click-options"
                    onClick={() => handleOptions("Return to main options")}
                  >
                    ⬅️ Return to main options
                  </div>
                </div>
              ),
            });
          }

          setChat((prevChat) => [...prevChat, ...newMessages]);
        } else {
          setChat((prevChat) => [
            ...prevChat,
            { sender: "bot", content: reply },
          ]);
        }
      }, 1500);
    } else if (types.includes(selected)) {
      setChat((prevChat) => prevChat.slice(0, -1));
      setChat((prevChat) => [
        ...prevChat,
        { sender: "user", content: `I want to see ${selected} projects.` },
      ]);
      const filteredProjects = projects.filter(
        (project) => project.type === selected
      );

      setTimeout(
        () =>
          setChat((prevChat) => [
            ...prevChat,
            {
              sender: "bot",
              content: (
                <div className="option-container">
                  {filteredProjects.map((item, idx) => (
                    <div key={idx} className="click-options">
                      🔗 <a href={item.url}>{item.name}</a>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              sender: "bot",
              content: (
                <div className="option-container">
                  <div
                    className="click-options"
                    onClick={() => handleOptions("Return to main options")}
                  >
                    ⬅️ Return to main options
                  </div>
                </div>
              ),
            },
          ]),
        2000
      );
    }
  }
  return (
    <div className="chatbot">
      <div className={`chat-screen ${flag ? "" : "mb-60"}`}>
        {chat.map((speech, idx) => (
          <div
            className={`message ${speech.sender === "bot" ? "bot" : "user"}`}
            key={idx}
          >
            <span>{speech.content}</span>
          </div>
        ))}
      </div>

      <div className={`user-input ${flag ? "hidden" : ""}`}>
        <input
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          placeholder="How can I help you?"
          className="text-box"
        />
        <button className="send" onClick={handleSend}>
          <img src={Send} alt="Send" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
