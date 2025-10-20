import React, { useState } from "react";
import "./MyPolicies.css";

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

export default function MyPolicies() {
    const [policydata, setPolicyData] = useState([tempdata,tempdata]);

    function handleClick() {
      
    }

    return (
        <>
            <h1 id="showpolicyh1">My Policies</h1>
            <button id="showbtn" onClick={handleClick}>Refresh</button>
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
                        <div>Area</div>
                        <div>{`${p.areaname} ${p.areanametype}`}</div>
                    </div>
                    <div className="policyband">
                        <div>Index level Set</div>
                        <div>{`${p.indexlevel} ${p.indexleveltype}`}</div>
                    </div>
                </div>
            ))}
        </>
    );
}
