import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import './Payment.css';
import ScrollTop from '../../components/Scroll-top/ScrollTop';

function Payment() {
  return (
    <div className="payment-page">
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* Billing Details Column */}
          <div className="col-md-8 shadow p-4 bg-white rounded">
            <h3>Billing details</h3>
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">First name *</label>
                  <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">Last name *</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">Company name (optional)</label>
                <input type="text" className="form-control" id="companyName" />
              </div>

              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country / Region *</label>
                <select className="form-select" id="country">
                  <option value="Sri Lanka">Sri Lanka</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">Street address *</label>
                <input type="text" className="form-control mb-2" id="streetAddress" placeholder="House number and street name" />
                <input type="text" className="form-control" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="city" className="form-label">Town / City *</label>
                  <input type="text" className="form-control" id="city" />
                </div>
                <div className="col">
                  <label htmlFor="postcode" className="form-label">Postcode / ZIP *</label>
                  <input type="text" className="form-control" id="postcode" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone *</label>
                <input type="text" className="form-control" id="phone" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address *</label>
                <input type="email" className="form-control" id="email" />
              </div>

              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" id="shipDifferent" />
                <label className="form-check-label" htmlFor="shipDifferent">
                  Ship to a different address?
                </label>
              </div>

              <div className="mb-4">
                <label htmlFor="orderNotes" className="form-label">Order notes (optional)</label>
                <textarea className="form-control" id="orderNotes" rows="3" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
              </div>
            </form>
          </div>

          {/* Your Order Column */}
          <div className="col-md-4">
            <div className="shadow p-4 bg-white rounded">
              <h3>Your order</h3>
              <ul className="list-group mb-4">
                <li className="list-group-item d-flex justify-content-between">
                  <span>The Born of APLEX x 1</span>
                  <span>₨26.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₨26.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>Free shipping</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>₨26.00</strong>
                </li>
              </ul>

              <h4 className="mb-3">Payment Method</h4>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" />
                  <label className="form-check-label" htmlFor="bankTransfer">
                    Direct bank transfer
                  </label>
                  <p className="text-muted small mt-2">Make your payment directly into our bank account...</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="checkPayments" />
                  <label className="form-check-label" htmlFor="checkPayments">
                    Check payments
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="cashOnDelivery" />
                  <label className="form-check-label" htmlFor="cashOnDelivery">
                    Cash on delivery
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" />
                  <label className="form-check-label" htmlFor="creditCard">
                    Credit/Debit Cards
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <button className="btn btn1 w-100">Place order</button>
            </div>
          </div>
        </div>
      </div>
      <ScrollTop/>
      <Footer />
    </div>
  );
}

export default Payment;
