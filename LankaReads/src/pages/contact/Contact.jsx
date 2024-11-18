import React from 'react';
import Header from '../../components/Header/Header';
import ScrollTop from '../../components/Scroll-top/ScrollTop';
import Footer from '../../components/Footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './Contact.css'; // Import the CSS file

const Contact = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "50dbdc6c-4bf5-4a49-b44d-aa91632a6245");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message has been sent successfully!",
        icon: "success"
      });
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="jumbotron text-white text-center">
          <div className="container">
            <img src="https://www.shutterstock.com/image-photo/email-concept-person-using-laptop-600nw-1913233225.jpg" alt="Contact Us" className="img-fluid jumbotron-image" />
          </div>
        </div>
        <div className="container my-5 contact-container p-4">
          <h1 className="text-center mb-4">Contact Us</h1>
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-3">Get in Touch</h3>
              <p className="mb-4">Feel free to reach out to us for any inquiries, suggestions, or feedback. We would love to hear from you!</p>

              <form onSubmit={onSubmit} className="contact-form">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" name='name' required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" name='email' required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" name="message" rows="4" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit" className="btn btn-danger btn-submit">Submit</button>
              </form>
            </div>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <h3 className="mb-3 text-center">Our Location</h3>
              <p className="text-center">We are located at:</p>
              <address className="mb-4 text-center">
                <strong>Book Reading Inc.</strong><br />
                123 Book Street<br />
                Reading City, RD 12345<br />
                Email: contact@bookreading.com<br />
                Phone: (123) 456-7890
              </address>
              <div className="my-4 text-center">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-icon text-primary me-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-icon text-info me-3">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-icon text-danger me-3">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-icon text-danger me-3">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
              <img src="" alt="Location Map" className="img-fluid rounded shadow location-map" />
            </div>
          </div>
        </div>
      </div>
      <ScrollTop />
      <Footer />
    </>
  );
};

export default Contact;
