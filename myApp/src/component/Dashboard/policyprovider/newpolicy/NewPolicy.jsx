import React from "react";

import "./NewPolicy.css";

export default function Support() {
  function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById("supportform");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // console.log("Test:", data);



  }
  return (
    <div className="testbox">
      <form id="supportform" action="/">
        <h1 id="supporth1">Policy Creation</h1>
        <p id="supportp">
          Please mention the details.
        </p>
        <hr />
        <div className="item">
          <p>Date of Creation</p>
          <input type="date" required="" name="dateofcreation" />
          <i id="iconsupport" className="fas fa-calendar-alt" />
        </div>
        <div className="item">
          <p>Name of Policy</p>
          <input type="text" placeholder="Full Name" required name="nameofpolicy" />
        </div>
        <div className="item" >
          <p>Policy Duration(Months)</p>
          <input type="number" name="policyofdurationmonth" />

          <p>Policy Duration(Days)</p>
          <input type="number" required name="policydurationdays" />
        </div>
        <div className="item">
          <p>Premium Payment Period(Month)</p>
          <input type="number" name="premiumpaymentmonth" />
          <p>Premium Payment Period(Days)</p>
          <input type="number" required name="premiumpaymentdays" />
        </div>
        <div className="item">
          <p>Premium Amount</p>
          <input type="number" required name="paymentamt" />
          <select className="selectinput" name="paymentamttype">
            <option value="1">Direct</option>
            <option value="1000">In Thousand</option>
            <option value="100000">In Lakh</option>
            <option value="10000000">In Crore</option>
          </select>
        </div>
        <div className="item">
          <p>Payout Amount</p>
          <input type="number" required name="premiumamt" />
          <select className="selectinput" name="premiumamttype">
            <option value="1">Direct</option>
            <option value="1000">In Thousand</option>
            <option value="100000">In Lakh</option>
            <option value="10000000">In Crore</option>
          </select>
        </div>
        <div className="item">
          <p>Area Name</p>
          <input type="input" placeholder="for eg. Bangalore" required name="areaname" />
          <p>Area Type</p>
          <select className="selectinput" name="areanametype">
            <option value="village">Village</option>
            <option value="subdistrict">Taluk / Sub-district</option>
            <option value="district">District</option>
            <option value="city">City / Town</option>
          </select>
        </div>
        <div className="item">
          <p>Index Level</p>
          <input type="Number" placeholder="" required name="indexlevel" />
          <p>Type</p>
          <select className="selectinput" name="indexleveltype">
            <option value="village">%(humidity)</option>
            <option value="subdistrict">mm(rainfall) / Sub-district</option>
            <option value="district">Celcius(Temperature)</option>
            <option value="city">km/h(Wind Speed)</option>
            <option value="city">cm(Snofall)</option>
          </select>
        </div>

        <div className="btn-block">
          <button type="submit" onClick={submitForm}>
            Send
          </button>
        </div>

      </form>
    </div>
  );
}