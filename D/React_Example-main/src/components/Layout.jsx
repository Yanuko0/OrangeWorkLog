import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useMember } from "../hook/useMember";
import axios from "axios";

export default function Layout() {
  const { member, dispatch } = useMember();
  const [empId, setEmpId] = useState("222008");

  useEffect(() => {
    const getEmpData = async () => {
      const response = await axios({
        url: "https://orangeapi.orange-electronic.com/api/GetDeptEmp",
        method: "POST",
        data: {
          DeptId: "", //部門代號
          EmpId: empId, //工號
          Company: "", //公司
        },
      });

      dispatch({ type: "ADD_MEMBER", payload: response.data });
    };
    getEmpData();
  
  }, [dispatch, empId]);

  return (
    <main className="grid h-screen w-full">
      <button
        style={{
          backgroundColor: "#88ff99",
          border: "1px",
          borderColor: "#000000",
          padding: "2px",
          margin: "10px",
        }}
        onClick={() => dispatch({ type: "REMOVE_MEMBER" })}
      >
        登出
      </button>
      <Outlet />
    </main>
  );
}
