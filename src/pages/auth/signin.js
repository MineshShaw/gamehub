import Login from "@/components/Login";
import Signup from "@/components/SignUp";
import { useState } from "react";

const Signin = () => {
  const [tab, changeTab] = useState("login");

  return (
    <div className="signin-page flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="signin-header text-3xl font-bold mb-6">
        Welcome to GameHub!
      </div>
      <div className="page-content flex flex-col">
        <div className="tabs flex">
          <button
            onClick={() => changeTab("login")}
            className={`tab ${
              tab === "login" ? "active-tab bg-gray-200" : ""
            } mr-2 w-[50%] border-2 p-6 font-sans font-semibold text-xl rounded-3xl`}
          > 
            Login
          </button>
          <button
            onClick={() => changeTab("signup")}
            className={`tab ${
              tab === "signup" ? "active-tab bg-gray-200" : ""
            } mr-2 w-[50%] border-2 p-6 font-sans font-semibold text-xl rounded-3xl`}
          >
            Signup
          </button>
        </div>
        <div className="tab-content">
          {tab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Signin;
