import React, { useRef } from 'react';
import './contact.scss';
import Map from '../../Components/Map/Map';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_o2fzm0r',
      'template_toiab49',
      form.current,
      'IVOut_aHp380MeAsT'
    )
    .then((result) => {
        console.log('Message sent successfully:', result.text);
        alert('Message sent successfully!');
    }, (error) => {
        console.log('An error occurred:', error.text);
        alert('Failed to send the message, please try again later.');
    });
  };

  return (
    <div className="contact">
      <div className="top">
        <h1>Contact</h1>
        <hr />
        <p>Proin eu ante vel mauris molestie dignissim non eget nunc. Integer ac massa orci. Suspendisse vulputate semper nunc eget rhoncus.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo tempor, congue justo at, lobortis orci.</p>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> 123 Fifth Avenue, New York, NY 10160</li>
            <li><i className="fas fa-envelope"></i> <a href="mailto:contact@info.com">contact@info.com</a></li>
            <li><i className="fas fa-phone"></i> 9-334-7565-9787</li>
          </ul>
        </div>
        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <div className="form-group">
              <input type="text" name="first_name" placeholder="First Name" required />
              <input type="text" name="last_name" placeholder="Last Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your email address..." required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Message..." required></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="bottom">
        <Map />
      </div>
    </div>
  );
};

export default Contact;
