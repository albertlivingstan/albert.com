import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaWhatsapp, FaFileDownload } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Albert's AI Assistant 🤖. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate a unique session ID for this chat session
    setSessionId(Math.random().toString(36).substring(2, 15));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveToFirebase = async (msgText, isBotMsg) => {
    try {
      if (sessionId) {
        await addDoc(collection(db, "chatLogs"), {
          sessionId,
          text: msgText,
          isBot: isBotMsg,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { text, isBot: false }];
    setMessages(newMessages);
    setInput("");
    saveToFirebase(text, false);

    // Bot response logic
    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes("about") || lowerText.includes("who")) {
        botResponse = "Albert is a B.Tech CSE student passionate about Web Development, AI, and IoT. He builds practical, real-world projects!";
      } else if (lowerText.includes("certificate") || lowerText.includes("certification")) {
        botResponse = "Albert has completed 30+ certifications from top institutions like Microsoft, IBM, and Cisco. You can check the Certificates section for details.";
      } else if (lowerText.includes("project") || lowerText.includes("work")) {
        botResponse = "Albert has worked on various cool projects including Web Apps, AI models, and IoT architectures. Check out the Projects section on the homepage!";
      } else if (lowerText.includes("hi") || lowerText.includes("hello")) {
        botResponse = "Hello there! Feel free to ask me about Albert's skills, projects, or certificates.";
      } else if (lowerText.includes("resume") || lowerText.includes("cv")) {
        botResponse = "Here is Albert's resume! I'm downloading it for you now.";
        const link = document.createElement('a');
        link.href = '/ALBERT_LIVINGSTANG_Resume.pdf';
        link.download = 'ALBERT_LIVINGSTANG_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        botResponse = "That sounds interesting! For more specific questions, I can connect you directly to Albert.";
        setMessages([...newMessages, 
          { text: botResponse, isBot: true },
          { 
            text: "Click here to chat on WhatsApp", 
            isBot: true, 
            isLink: true, 
            url: "https://wa.me/916382357454" 
          }
        ]);
        saveToFirebase(botResponse, true);
        return;
      }

      setMessages([...newMessages, { text: botResponse, isBot: true }]);
      saveToFirebase(botResponse, true);
    }, 600);
  };

  const quickReplies = ["About Me", "Certificates", "Projects", "Download Resume"];

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="chatbot-window"
          >
            <div className="chatbot-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaRobot size={24} color="#38bdf8" />
                </motion.div>
                <h4>AI Assistant</h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn"><FaTimes /></button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}
                >
                  <div className={`message-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                    {msg.isLink ? (
                      <a href={msg.url} target="_blank" rel="noreferrer" className="whatsapp-link">
                        <FaWhatsapp size={18} /> {msg.text}
                      </a>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-replies">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  className="quick-reply-btn"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <button onClick={() => handleSend(input)} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <FaRobot size={30} />
      </motion.button>
    </div>
  );
};

export default Chatbot;
