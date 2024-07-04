import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MemberInformation from "../components/MemberInformation";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExampleDetailPage() {
  const [member, setMember] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async function getEmpData() {
      const response = await axios({
        url: "https://orangeapi.orange-electronic.com/api/GetDeptEmp",
        method: "POST",
        data: {
          DeptId: "", //部門代號
          EmpId: id, //工號
          Company: "", //公司
        },
      });
      setMember(response.data);
    })();
  }, [id]);

  return (
    <div>
      <MemberInformation empData={member} />
      <Link to={"/example"}>回上頁</Link>
    </div>
  );
}
