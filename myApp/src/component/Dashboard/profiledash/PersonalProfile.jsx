import React from "react";

import "./profile.css";

export default function PersonalProfile({ userdata }) {
  return (
    <>
      <p id="headingprofile">Personal Info</p>
      <div id="profileimage"></div>
      <div id="info">
        <div className="infodiv">
          <div className="infodivhead">Name</div>
          <div className="infodivval">{userdata.name || ""}</div>
        </div>
        {userdata.type === "Farmer" && <div className="infodiv">
          <div className="infodivhead">Gender</div>
          <div className="infodivval">
            {userdata.gender === false
              ? "Male"
              : userdata.gender === true
                ? "Female"
                : ""}
          </div>
        </div>}
        <div className="infodiv">
          <div className="infodivhead">Mobile Number</div>
          <div className="infodivval">{userdata.mobileno || ""}</div>
        </div>
        <div className="infodiv">
          <div className="infodivhead">{`Date of ${userdata.type === "Farmer" ? "Birth" : "Establishment"}`}</div>
          <div className="infodivval">{userdata.dob || ""}</div>
        </div>
        <div className="infodiv">
          <div className="infodivhead">Address</div>
          <div className="infodivval">
            {[
              userdata.address?.street,
              userdata.address?.city,
              userdata.address?.state,
              userdata.address?.pincode
            ]
              .filter(Boolean)
              .join(", ")}
          </div>
        </div>
      </div>
    </>
  );
}
