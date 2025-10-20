import React from "react";

import "./Support.css";

export default function Support() {
  return (
    <div className="testbox">
      <form id="supportform" action="/">
        <h1 id="supporth1">Complaint Form</h1>
        <p id="supportp">
          Please send us details about the incident you would like to report.
          Our Complaint Center will analyze your complaint and take the
          appropriate measures in order that the reported situation will not
          occur at any other time in the future.
        </p>
        <hr />
        <div className="item">
          <p>Date of complaint</p>
          <input type="date" name="name" required="" />
          <i id="iconsupport" className="fas fa-calendar-alt" />
        </div>
        <div className="item">
          <p>Name</p>
          <input type="text" name="name" placeholder="First" required />
          <input type="text" name="name" placeholder="Last" />
        </div>
        <div className="item">
          <p>Email</p>
          <input type="text" name="name" placeholder="example@gmail.com" />
        </div>
        <div className="item">
          <p>Phone No</p>
          <input type="text" name="name" placeholder="+91" />
        </div>
        <div className="item address">
          <p>Address</p>
          <div className="street">
            <input
              className="street-item"
              type="text"
              name="name"
              placeholder="Street address"
            />
            <input
              className="street-item"
              type="text"
              name="name"
              placeholder="Street addres line 2"
            />
            <input type="text" name="name" placeholder="City" />
            <input type="text" name="name" placeholder="Region" />
            <input type="text" name="name" placeholder="Postal / zip code" />

          </div>
        </div>
        <div className="item complaint-details">
          <p>Complaint details</p>
          <div className="complaint-details-item">
            <textarea rows={5} required />
          </div>
        </div>
        <div className="item desired-outcome">


        </div>
        <h4 id="supporth4">Your signature</h4>
        <textarea rows={5} required />

        <small className="small">
          By signing you declare that all information you have entered is
          truthful and accurate.
        </small>
        <div className="btn-block">
          <button type="submit" href="/">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}