import React, { useState } from "react";
import { ethers } from "ethers";

import { getPoliciesForFarmer, payInsurancePremium } from "../../../../conf/Contract/insurancePolicy/insurancePolicy";
import { trigger } from "../../../../conf/Contract/connectOracle/connectOracle";
import "./MyPolicies.css";

export default function MyPolicies() {
    const [policydata, setPolicyData] = useState([]);

    async function handleClick() {

        const data = await getPoliciesForFarmer();

        const safeJSON = JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        const parsedData = JSON.parse(safeJSON);

        // console.log(parsedData);

        setPolicyData(parsedData);
    }

    async function handlePremium(id, premium) {
        if (!window.confirm("Are you sure you want to pay?")) return;

        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr'
            );
            const data = await response.json();
            const ethPriceInINR = data.ethereum.inr;

            const premiumInETH = (Number(premium) / ethPriceInINR).toFixed(18);
            const premiumInWei = ethers.parseEther(premiumInETH.toString());

            const receipt = await payInsurancePremium(id, premiumInWei);

            alert("Premium paid successfully!");
        } catch (error) {
            console.error("Error paying premium:", error);
            alert("Transaction failed: " + (error.reason || error.message || error));
        }
    }

    async function handlePayout(id) {
        try {
            let userInput;
            while (!userInput) userInput = window.prompt("Enter a date (YYYY-MM-DD) to claim:");

            await trigger(id, userInput);

        } catch (error) {
            console.error("Error paying premium:", error);
            alert("Transaction failed: " + (error.reason || error.message || error));
        }
    }


    return (
        <>
            <h1 id="showpolicyh1">My Policies</h1>
            <button id="showbtn" onClick={handleClick}>Refresh</button>
            <hr style={{ marginBottom: "2rem" }} />

            {policydata.map((p, index) => (
                <div key={index} id="policy-container">
                    <div className="policyband"><div>UID</div><div>{p[0]}</div></div>
                    <div className="policyband"><div>Name of Policy</div><div>{p[1][1]}</div></div>
                    <div className="policyband"><div>Date of Creation</div><div>{new Date(Number(p[1][0])).toLocaleString()}</div></div>
                    <div className="policyband">
                        <div>Policy Duration</div>
                        <div>{`${p[2][0]} Months ${p[2][1]} Days`}</div>
                    </div>
                    <div className="policyband">
                        <div>Premium Duration</div>
                        <div>{`${p[2][2]} Months ${p[2][3]} Days`}</div>
                    </div>
                    <div className="policyband">
                        <div>Premium Amount Set</div>
                        <div>{p[3][0]}</div>
                    </div>
                    <div className="policyband">
                        <div>Payout Amount Set</div>
                        <div>{p[3][1]}</div>
                    </div>
                    <div className="policyband">
                        <div>Area</div>
                        <div>{`${p[4][0]} ${p[4][1]}`}</div>
                    </div>
                    <div className="policyband">
                        <div>Index level Set</div>
                        <div>{p[5][0]}</div>
                    </div>
                    <div className="policyband">
                        <div>Index Type</div>
                        <div>{p[5][1]}</div>
                    </div>
                    <button id="showbtn" onClick={() => handlePremium(p[0], p[3][0])}>Pay Premium</button>
                    <button id="showbtn" onClick={() => handlePayout(p[0])}>Get Payout</button>
                </div>
            ))}
        </>
    );
}
