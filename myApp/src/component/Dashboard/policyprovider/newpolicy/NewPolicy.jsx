import React from "react";
import { addInsurancePolicy } from "../../../../conf/Contract/insurancePolicy/insurancePolicy";
import { ethers } from "ethers";

import "./NewPolicy.css";

function generateUniqueNumber() {
  const val = Date.now() + Math.floor(Math.random() * 1000000);
  return val;
}


export default function Support() {

  async function checkBalance(signer, amountInWei) {
    const signerAddress = await signer.getAddress();
    const balance = await signer.provider.getBalance(signerAddress);

    const required = BigInt(amountInWei);

    if (balance < required) {
      throw new Error(
        `Insufficient balance. Required: ${ethers.formatEther(required)} ETH, Available: ${ethers.formatEther(balance)} ETH`
      );
    }
    return true;
  }



  async function submitForm(event) {
    event.preventDefault();

    try {
      const form = document.getElementById("supportform");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const premiumInRupees = Number(data.premiumamt) * Number(data.premiumamttype);
      const payoutInRupees = Number(data.paymentamt) * Number(data.paymentamttype);

      console.log("Premium in ₹:", premiumInRupees);
      console.log("Payout in ₹:", payoutInRupees);


      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr'
      );
      if (!response.ok) throw new Error("Failed to fetch ETH price from CoinGecko");
      const conversion = await response.json();
      const ethPriceInINR = conversion.ethereum.inr;


      const safetyMultiplier = 2;
      const payoutInETH = ((payoutInRupees * safetyMultiplier) / ethPriceInINR).toFixed(18);
      const payoutInWei = ethers.parseEther(payoutInETH.toString());


      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      await checkBalance(signer, payoutInWei);
      console.log("Sending ETH (wei):", payoutInWei.toString());


      const tx = await addInsurancePolicy(
        generateUniqueNumber(),
        data.nameofpolicy,
        {
          policy_in_months: Number(data.policyofdurationmonth),
          policy_in_days: Number(data.policydurationdays),
          payout_in_months: Number(data.premiumpaymentmonth),
          payout_in_days: Number(data.premiumpaymentdays),
        },
        {
          premium_amount: premiumInRupees,
          payout_amount: payoutInRupees,
        },
        {
          area_name: data.areaname,
          area_type: data.areanametype,
        },
        {
          index_level: Number(data.indexlevel),
          index_type: data.indexleveltype,
        },
        { value: payoutInWei }
      );

      console.log(tx);

      alert("Insurance policy submitted successfully!");
      form.reset();

    } catch (error) {
      console.error("Error submitting policy:", error);
      alert("Transaction failed: " + (error.reason || error.message || error));
    }
  }



  return (
    <div className="testbox">
      <form id="supportform" action="/">
        <h1 id="supporth1">Policy Creation</h1>
        <p id="supportp">Please mention the details.</p>
        <hr />
        <div className="item">
          <p>Name of Policy</p>
          <input type="text" placeholder="Full Name" required name="nameofpolicy" />
        </div>

        <div className="item">
          <p>Policy Duration (Months)</p>
          <input type="number" name="policyofdurationmonth" />
          <p>Policy Duration (Days)</p>
          <input type="number" required name="policydurationdays" />
        </div>

        <div className="item">
          <p>Premium Payment Period (Months)</p>
          <input type="number" name="premiumpaymentmonth" />
          <p>Premium Payment Period (Days)</p>
          <input type="number" required name="premiumpaymentdays" />
        </div>

        <div className="item">
          <p>Premium Amount</p>
          <input type="number" required name="premiumamt" />
          <select className="selectinput" name="premiumamttype">
            <option value="1">Direct (₹)</option>
            <option value="1000">In Thousand</option>
            <option value="100000">In Lakh</option>
            <option value="10000000">In Crore</option>
          </select>
        </div>

        <div className="item">
          <p>Payout Amount</p>
          <input type="number" required name="paymentamt" />
          <select className="selectinput" name="paymentamttype">
            <option value="1">Direct (₹)</option>
            <option value="1000">In Thousand</option>
            <option value="100000">In Lakh</option>
            <option value="10000000">In Crore</option>
          </select>
        </div>

        <div className="item">
          <p>Area Name</p>
          <input type="text" placeholder="for eg. Bangalore" required name="areaname" />
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
          <input type="number" required name="indexlevel" />
          <p>Type</p>
          <select className="selectinput" name="indexleveltype">
            <option value="humidity">%(Humidity)</option>
            <option value="rainfall">mm (Rainfall)</option>
            <option value="temperature">°C (Temperature)</option>
            <option value="windspeed">km/h (Wind Speed)</option>
            <option value="snowfall">cm (Snowfall)</option>
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
