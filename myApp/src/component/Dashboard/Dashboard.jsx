import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import supabase from "../../conf/db/connect"
import { connectWallet } from "../../conf/Wallet/walletConfig"

import "./dashboard.css";

import PersonalProfile from "./profiledash/PersonalProfile";
import AccountProfile from "./profiledash/AccountProfile";
import Support from "./supportandcomplaint/Support";
import NewPolicy from "./policyprovider/newpolicy/NewPolicy";
import ShowPolicy from "./policyprovider/showpolicy/ShowPolicy";
import ShowPolicies from "./farmer/showpolicies/ShowPolicies";
import MyPolicies from "./farmer/mypolicies/MyPolicies";
import Header from "../Header/Header"

export default function Dashboard() {
  const [userdata, setuserdata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function modifydata() {

      const address = await connectWallet();

      if (!address) {
        navigate("/");
        return;
      }

      console.log(address);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", address)


      if (error) {
        console.error("Supabase error:", error);
      } else if (data.length === 0) {
        navigate('/register');
      } else {
        setuserdata(data[0]);
      }

    }
    modifydata();
  }, []);

  return (
    <>
      <Header />
      <div id="maincontent">
        <div id="leftnavdash">
          <Link to="/dashboard">
            <button className="divleftdash">Personal Information</button>
          </Link>
          <Link to="/dashboard/accountprofile">
            <button className="divleftdash">Account Information</button>
          </Link>
          <Link to="/dashboard/showpolicyfarmer">
            <button className="divleftdash">Show Policies (Farmer)</button>
          </Link>
          <Link to="/dashboard/showpolicyprovider">
            <button className="divleftdash">Show Policies (Provider)</button>
          </Link>
          <Link to="/dashboard/mypolicyfarmer">
            <button className="divleftdash">My Policies</button>
          </Link>
          <Link to="/dashboard/newpolicyprovider">
            <button className="divleftdash">Create New Policies</button>
          </Link>
          <Link to="/dashboard/supportandcomplaint">
            <button className="divleftdash">Support</button>
          </Link>
        </div>

        <div id="rightcontentdash">
          <Routes>
            <Route path="" element={<PersonalProfile userdata={userdata} />} />
            <Route path="accountprofile" element={<AccountProfile userdata={userdata} />} />
            <Route path="showpolicyfarmer" element={<ShowPolicies />} />
            <Route path="showpolicyprovider" element={<ShowPolicy />} />
            <Route path="mypolicyfarmer" element={<MyPolicies />} />
            <Route path="newpolicyprovider" element={<NewPolicy />} />
            <Route path="supportandcomplaint" element={<Support />} />
          </Routes>

        </div>
      </div>
    </>

  );
}
