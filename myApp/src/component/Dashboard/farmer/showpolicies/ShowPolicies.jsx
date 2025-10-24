import React, { useState } from "react";

import { addFarmerToPolicy,showPolicestoFarmer } from "../../../../conf/Contract/insurancePolicy/insurancePolicy";

import "./ShowPolicies.css";

export default function ShowPolicies() {
    const [policydata, setPolicyData] = useState([]);

    async function handleClick() {
        const policy_area={area_name:document.getElementById("placename").value,
            area_type:document.getElementById("placetype").value
        }
        console.log(policy_area)
        const data = await showPolicestoFarmer(policy_area);
        
        const safeJSON = JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        const parsedData = JSON.parse(safeJSON);

        // console.log(parsedData);
        
        setPolicyData(parsedData)
    }
    async function handleSubs(id) {
        if (!window.confirm("Do u agree with the terms and condition?")) return;
        try {

            const tx = await addFarmerToPolicy(Number(id));

            // console.log(receipt);

        } catch (error) {
            console.error("Error adding farmer:", error);
            // alert("Transaction failed: " + (error.message || error));
        }


    }
    return (
        <>
            <h1 id="showpolicyh1">Available Policies</h1>
            <div id="searchpolicy">
                <input id="placename" type="text" placeholder="for eg. Bangalore" required />
                <select id="placetype" className="selectinput" name="areanametype">
                    <option value="village">Village</option>
                    <option value="subdistrict">Taluk / Sub-district</option>
                    <option value="district">District</option>
                    <option value="city">City / Town</option>
                </select>
                <button id="showbtn" onClick={handleClick}>Search</button>
            </div>

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
                        <div>Index level Set</div>
                        <div>{p[5][0]}</div>
                    </div>
                    <div className="policyband">
                        <div>Index Type</div>
                        <div>{p[5][1]}</div>
                    </div>
                    <button id="showbtn" onClick={() => handleSubs(p[0])}>Subscribe</button>
                    
                </div>
            ))}
        </>
    );
}
