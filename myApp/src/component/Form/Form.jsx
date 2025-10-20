import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import supabase from "../../conf/db/connect";

import "./Form.css";

export default function Form() {

  const [isFarmer, setIsFarmer] = useState(true);
  const navigate = useNavigate();

  function handleTypeChange() {
    setIsFarmer((prev) => !prev);
    console.log("Account type changed:", !isFarmer ? "Farmer" : "Insurance Provider");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById("supportform");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const customerAddress = {
      city: data.city,
      street: data.street,
      state: data.state,
      pincode: data.code,
    };

    if (!window.ethereum) {
      console.log("Wallet not installed");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];

    console.log("Form data:", data);
    console.log("Wallet address:", walletAddress);


    const { error } = await supabase
      .from("users")
      .insert({
        id: walletAddress,
        name: data.name,
        gender: data.gender === "male" ? false : true,
        mobileno: data.phoneno,
        address: customerAddress,
        dob: data.dob,
        type: data.accountType,
      });

    if (error) {
      console.error("Supabase error:", error);
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div id="mainform">
      <form id="supportform" onSubmit={handleSubmit}>
        <h1 id="supporth1">Registration Form</h1>
        <p id="supportp">Please provide the required personal information</p>

        <div id="formitem">
          <div className="item">
            <p>Customer Type</p>
            <select
              className="selectinput"
              name="accountType"
              onChange={handleTypeChange}
            >
              <option value="Farmer">Farmer</option>
              <option value="Insurance Provider">Insurance Provider</option>
            </select>
          </div>

          {isFarmer && (
            <div className="item">
              <p>Gender</p>
              <select className="selectinput" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}

          <div className="item">
            <p>Name</p>
            <input
              type="text"
              name="name"
              placeholder={isFarmer ? "Full Name" : "Organization Name"}
              required
            />
          </div>

          <div className="item">
            <p>Email</p>
            <input type="text" name="email" placeholder="example@gmail.com" />
          </div>

          <div className="item">
            <p>Phone No</p>
            <input
              type="text"
              name="phoneno"
              placeholder={isFarmer ? "Personal Phone No" : "Organization Phone No"}
            />
          </div>

          <div className="item">
            <p>{`Date of ${isFarmer ? "Birth" : "Establishment"}`}</p>
            <input type="date" name="dob" />
          </div>

          <div className="item address">
            <p>{isFarmer ? "Personal Address" : "Company Address"}</p>
            <div className="street">
              <input
                className="street-item"
                type="text"
                name="street"
                placeholder="Street address"
              />
              <input type="text" name="city" placeholder="City" />
              <input type="text" name="state" placeholder="State" />
              <input type="text" name="code" placeholder="Postal / zip code" />
            </div>
          </div>

          <div className="btn-block">
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
