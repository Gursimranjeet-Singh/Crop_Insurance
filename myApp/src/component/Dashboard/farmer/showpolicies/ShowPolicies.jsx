import React, { useState } from "react";
import "./ShowPolicies.css";

const tempdata = {
    id:"1",
    areaname: "Ambala",
    areanametype: "city",
    dateofcreation: "1212-12-12",
    indexlevel: "120",
    indexleveltype: "subdistrict",
    nameofpolicy: "Gursimranjeet Policy",
    paymentamt: "20",
    paymentamttype: "1000",
    policydurationdays: "0",
    policyofdurationmonth: "12",
    premiumamt: "1",
    premiumamttype: "100000",
    premiumpaymentdays: "-1",
    premiumpaymentmonth: "1"
};

export default function ShowPolicies() {
    const [policydata, setPolicyData] = useState([tempdata,tempdata]);

    function handleClick() {
      
    }
    function handleSubs(id){
        if(!window.confirm("Do u agree with the terms and condition?")) return;
        //logic handling
    }
    return (
        <>
            <h1 id="showpolicyh1">Available Policies</h1>
            <div id="searchpolicy">
                <input type="text" placeholder="for eg. Bangalore" required  />
                <select className="selectinput" name="areanametype">
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
                    <div className="policyband"><div>UID</div><div>{p.id}</div></div>
                    <div className="policyband"><div>Name of Policy</div><div>{p.nameofpolicy}</div></div>
                    <div className="policyband"><div>Date of Creation</div><div>{p.dateofcreation}</div></div>
                    <div className="policyband">
                        <div>Policy Duration</div>
                        <div>{`${p.policyofdurationmonth} Months ${p.policydurationdays} Days`}</div>
                    </div>
                    <div className="policyband">
                        <div>Premium Amount Set</div>
                        <div>{`${p.premiumamt} ${p.premiumamttype}`}</div>
                    </div>
                    <div className="policyband">
                        <div>Payout Amount Set</div>
                        <div>{`${p.paymentamt} ${p.paymentamttype}`}</div>
                    </div>
                    <div className="policyband">
                        <div>Index level Set</div>
                        <div>{`${p.indexlevel} ${p.indexleveltype}`}</div>
                    </div>
                    <button id="showbtn" onClick={() => handleSubs(p.id)}>Subscribe</button>
                </div>
            ))}
        </>
    );
}
