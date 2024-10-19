import React from 'react';
import './messages.css';  // Ensure you have the styles in this CSS file

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
          <img src="./images/jpm.jpg" alt="Mentor Paul" className="avatar" />
          <div className="message-content">
            <h3>Mentor Paul</h3>
            <p>Hey, could you schedule a time for...</p>
          </div>
          <span className="time">5 min</span>
          <span className="unread-count">2</span>
        </li>

        {/* Message 2 */}
        <li className="message-item">
          <img src="client/src/jpm.jpg" alt="JPM Recruiting" className="avatar" />
          <div className="message-content">
            <h3>JPM Recruiting</h3>
            <p>Thank you for applying to our Soft...</p>
          </div>
          <span className="time">12 min</span>
        </li>

        {/* Message 3 */}
        <li className="message-item">
          <img src="./images/rebirth_empowerment_logo.jpg" alt="Mentor Priyanka" className="avatar" />
          <div className="message-content">
            <h3>Mentor Priyanka</h3>
            <p>Hello! My name is Priyanka and I'm...</p>
          </div>
          <span className="time">48 min</span>
        </li>

        {/* Message 4 */}
        <li className="message-item">
          <img src="C:/Users/ohimo/OneDrive/Documents/SSHKeys/ReBirthFrontPage/rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" className="avatar" />
          <div className="message-content">
            <h3>ReBirth Empowerment</h3>
            <p>Congratulations! You have recently...</p>
          </div>
          <span className="time">1 hour</span>
        </li>

        {/* Message 5 */}
        <li className="message-item">
          <img src="C:/Users/ohimo/OneDrive/Documents/SSHKeys/ReBirthFrontPage/rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" className="avatar" />
          <div className="message-content">
            <h3>ReBirth Empowerment</h3>
            <p>Your one-time activation code is 0...</p>
          </div>
          <span className="time">5 hours</span>
        </li>
      </ul>

      <footer className="footer">
        <button className="footer-btn home-btn"></button>
        <button className="footer-btn message-btn active"></button>
        <button className="footer-btn settings-btn"></button>
      </footer>
    </div>
  );
};

export default Messages;
