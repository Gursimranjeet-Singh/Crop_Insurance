import React, { useState } from "react";

import { getPoliciesForInsuranceProvider } from "../../../../conf/Contract/insurancePolicy/insurancePolicy";

import "./ShowPolicy.css";

export default function ShowPolicy() {
    const [policydata, setPolicyData] = useState([]);

    async function handleClick() {
        const data = await getPoliciesForInsuranceProvider();
        const safeJSON = JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        const parsedData = JSON.parse(safeJSON);

        console.log(parsedData);

        setPolicyData(parsedData)
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
                </div>
            ))}
        </>
    );
}
