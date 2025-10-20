// this is for Account Info page
import React from "react";

import "./profile.css";

export default function AccountProfile({ userdata }) {
  return (
    <>
      <p id="headingprofile">Account Info</p>
      <div id="info">
        <div className="infodiv">
          <div className="infodivhead">Wallet Address</div>
          <div className="infodivval">{userdata.id || ""}</div>
        </div>
        <div className="infodiv">
          <div className="infodivhead">Account Type</div>
          <div className="infodivval">{userdata.type || ""}</div>
        </div>

        {/*
        {farmerAccount && (
          <div>
            <div className="infodiv">
              <div className="infodivhead">Land Area</div>
              <div className="infodivval">
                {farmerAccount.landArea || ""}
              </div>
            </div>

            <div className="infodiv">
              <div className="infodivhead">Land Coordinates</div>
              <div className="infodivval">
                {farmerAccount.coordinates || ""}
              </div>
            </div>
          </div>
        )}
        */}

      </div>
    </>
  );
}
