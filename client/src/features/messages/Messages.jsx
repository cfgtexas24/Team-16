import AppLayout from "../../components/AppLayout";

import React from "react";
import "./Messages.css"; // Ensure you have the styles in this CSS file

const Messages = () => {
  return (
    <AppLayout title="Messages">
      <div className="container">
        <header className="header">
          <h2>Message</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search by name"
          />
        </header>

        <ul className="message-list">
          {/* Message 1 */}
          <li className="message-item">
            <img
              src="/icons8-user-100.png"
              alt="Mentor Paul"
              className="avatar"
            />
            <div className="message-content">
              <h3>Mentor Paul</h3>
              <p>Hey, could you schedule a time for...</p>
            </div>
            <span className="time">5 min</span>
            <span className="unread-count">2</span> {/* Yellow unread count */}
          </li>

          {/* Message 2 */}
          <li className="message-item">
            <img src="/chase.jpg" alt="JPM Recruiting" className="avatar" />
            <div className="message-content">
              <h3>JPM Recruiting</h3>
              <p>Thank you for applying to our Soft...</p>
            </div>
            <span className="time">12 min</span>
          </li>

          {/* Message 3 */}
          <li className="message-item">
            <img
              src="/icons8-user-100.png"
              alt="Mentor Priyanka"
              className="avatar"
            />
            <div className="message-content">
              <h3>Mentor Priyanka</h3>
              <p>Hello! My name is Priyanka and I'm...</p>
            </div>
            <span className="time">48 min</span>
          </li>

          {/* Message 4 */}
          <li className="message-item">
            <img
              src="/rebirth_empowerment_logo.jpg"
              alt="ReBirth Empowerment"
              className="avatar"
            />
            <div className="message-content">
              <h3>ReBirth Empowerment</h3>
              <p>Congratulations! You have recently...</p>
            </div>
            <span className="time">1 hour</span>
          </li>

          {/* Message 5 */}
          <li className="message-item">
            <img
              src="/rebirth_empowerment_logo.jpg"
              alt="ReBirth Empowerment"
              className="avatar"
            />
            <div className="message-content">
              <h3>ReBirth Empowerment</h3>
              <p>Your one-time activation code is 0...</p>
            </div>
            <span className="time">5 hours</span>
          </li>
        </ul>
      </div>
    </AppLayout>
  );
};

export default Messages;
