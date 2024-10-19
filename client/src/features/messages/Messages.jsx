import React from 'react';
import { Home, MessageSquare, User } from 'lucide-react'; // Importing icons
import './Messages.css'; // Ensure you have the styles in this CSS file

const Messages = () => {
  return (
    <div className="container">
      <header className="header">
        <h2>Message</h2>
        <input type="text" className="search-bar" placeholder="🔍 Search by name" />
      </header>

      <ul className="message-list">
        {/* Message 1 */}
        <li className="message-item">
          <img src="client\public\jpm.jpg" alt="Mentor Paul" className="avatar" />
          <div className="message-content">
            <h3>Mentor Paul</h3>
            <p>And to follow-up, could you schedule a time for our bi-weekly mentor meetings</p>
          </div>
          <div className="message-meta">  {/* Wrapper div for time and unread count */}
            <span className="time">5 min</span>
            <span className="unread-count">2</span> {/* Yellow unread count */}
          </div>
        </li>
        <li className="message-item">
          <img src="client\public\jpm.jpg" alt="JPM Recruiting" className="avatar" />
          <div className="message-content">
            <h3>JPM Recruiting</h3>
            <p>Thank you for applying to our Software Engineeering DevOps role at JPMorgan Chase. We're still reviewing your application and would get back...</p>
          </div>
          <span className="time">12 min</span>
        </li>
        <li className="message-item">
          <img src="./images/rebirth_empowerment_logo.jpg" alt="Mentor Priyanka" className="avatar" />
          <div className="message-content">
            <h3>Mentor Priyanka</h3>
            <p>Hello! My name is Priyanka and I'm your assigned mentor at ReBirth Empowerment Education</p>
          </div>
          <span className="time">48 min</span>
        </li>
        <li className="message-item">
          <img src="client\public\rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" className="avatar" />
          <div className="message-content">
            <h3>ReBirth Empowerment</h3>
            <p>Congratulations! You have recently activated your application portal at ReBirth Empowerment. Ensure to go through the resources tab to find ou...</p>
          </div>
          <span className="time">1 hour</span>
        </li>
        <li className="message-item">
          <img src="client\public\rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" className="avatar" />
          <div className="message-content">
            <h3>ReBirth Empowerment</h3>
            <p>Your one-time activation code is 085-263</p>
          </div>
          <span className="time">5 hours</span>
        </li>
      </ul>

      <footer className="footer">
        <button className="footer-btn home-btn">
          <Home size={24} /> {/* Icon for Home */}
        </button>
        <button className="footer-btn message-btn active">
          <MessageSquare size={24} /> {/* Icon for Messages */}
        </button>
        <button className="footer-btn settings-btn">
          <User size={24} /> {/* Icon for User/Profile */}
        </button>
      </footer>
    </div>
  );
};


export default Messages;
