// TODO: styles in this file conflict with styles in the other files and changes layout on other pages. need to fix
import './messages.css'
import AppLayout from "../../components/AppLayout";


function Messages() { 
  return (
  <AppLayout title="Messages"> {/* Wrap the content in AppLayout */}
  <div class="container">
      <header class="header">
          <h2>Message</h2>
          <input type="text" class="search-bar" placeholder="🔍 Search by name"/>
      </header>
      <ul class="message-list">
          <li class="message-item">
              <img src="./images/jpm.jpg" alt="Mentor Paul" class="avatar"/>
              <div class="message-content">
                  <h3>Mentor Paul</h3>
                  <p>Hey, could you schedule a time for...</p>
              </div>
              <span class="time">5 min</span>
              <span class="unread-count">2</span>
          </li>
          <li class="message-item">
              <img src="client\src\jpm.jpg" alt="JPM Recruiting" class="avatar"/>
              <div class="message-content">
                  <h3>JPM Recruiting</h3>
                  <p>Thank you for applying to our Soft...</p>
              </div>
              <span class="time">12 min</span>
          </li>
          <li class="message-item">
              <img src="./images/rebirth_empowerment_logo.jpg" alt="Mentor Priyanka" class="avatar"/>
              <div class="message-content">
                  <h3>Mentor Priyanka</h3>
                  <p>Hello! My name is Priyanka and I'm...</p>
              </div>
              <span class="time">48 min</span>
          </li>
          <li class="message-item">
              <img src="C:\Users\ohimo\OneDrive\Documents\SSHKeys\ReBirthFrontPage\rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" class="avatar"/>
              <div class="message-content">
                  <h3>ReBirth Empowerment</h3>
                  <p>Congratulations! You have recently...</p>
              </div>
              <span class="time">1 hour</span>
          </li>
          <li class="message-item">
              <img src="C:\Users\ohimo\OneDrive\Documents\SSHKeys\ReBirthFrontPage\rebirth_empowerment_logo.jpg" alt="ReBirth Empowerment" class="avatar"/>
              <div class="message-content">
                  <h3>ReBirth Empowerment</h3>
                  <p>Your one-time activation code is 0...</p>
              </div>
              <span class="time">5 hours</span>
          </li>
      </ul>
      <footer class="footer">
          <button class="footer-btn home-btn"></button>
          <button class="footer-btn message-btn active"></button>
          <button class="footer-btn settings-btn"></button>
      </footer>
  </div>
  </AppLayout>
  )
}

export default Messages;