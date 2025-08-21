"use client";
import { useState, useEffect, useRef } from "react";
import "@/styles/liftai.css";

const MyTribes = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🚀 Lift AI – Coming Soon!\n\nWe’re working hard to bring Lift AI to life — your personal business companion right inside the app. With Lift AI, you’ll be able to:\n\n- Generate Business Documents: Get important documents tailored to your business needs in minutes.\n- Access Ready-to-Use Templates: Use practical business templates you can quickly fill out and adapt.\n- Consult on Demand: Receive personalized business guidance for your unique challenges.\n\nStay tuned — this feature is almost here, and it’s built to help you work smarter, not harder!",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // scroll down when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    const newMessage = {
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    // 1) add user message
    setMessages((m) => [...m, newMessage]);
    setInput("");

    // 2) add temporary bot placeholder
    setMessages((m) => [...m, { sender: "bot", text: "Thinking…" }]);
    setLoading(true);

    try {
      // Simulate bot response after some delay
      setTimeout(() => {
        const botMessage = {
          sender: "bot",
          text: "🚀 Lift AI – Coming Soon!\n\nWe’re working hard to bring Lift AI to life — your personal business companion right inside the app. With Lift AI, you’ll be able to:\n\n- Generate Business Documents: Get important documents tailored to your business needs in minutes.\n- Access Ready-to-Use Templates: Use practical business templates you can quickly fill out and adapt.\n- Consult on Demand: Receive personalized business guidance for your unique challenges.\n\nStay tuned — this feature is almost here, and it’s built to help you work smarter, not harder!",
          timestamp: Date.now(),
        };

        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = botMessage; // Replace "Thinking..." with actual message
          return copy;
        });
      }, 2000); // Simulate thinking delay
    } catch (e) {
      // On error, replace placeholder with error message
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          sender: "bot",
          text: "Error—please try again.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="chat" className="--dark-theme chat-container">
        <div className="chat__conversation-board">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat__conversation-board__message-container ${msg.sender === "user" ? "reversed" : ""}`}
            >
              <div className="chat__conversation-board__message__person">
                <div className="chat__conversation-board__message__person__avatar">
                  <img
                    src={msg.sender === "user" ? "/assets/img/o_2.png" : "/assets/img/O.png"}
                    className="sender-img"
                    alt="Avatar"
                  />
                </div>
                <span className="chat__conversation-board__message__person__nickname">
                  {msg.sender === "user" ? "You" : "Lift AI"}
                </span>
              </div>
              <div className="chat__conversation-board__message__context d-flex align-items-center">
                <div className="chat__conversation-board__message__bubble">
                  <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat__conversation-panel">
          <div className="chat__conversation-panel__container d-flex align-items-center w-100">
            <input
              className="chat__conversation-panel__input panel-item flex-grow-1"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="btn btn-primary ms-2"
              onClick={handleSend}
              disabled={loading}
            >
              <i className="fa fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTribes;
