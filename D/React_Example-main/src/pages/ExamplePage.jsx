import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { userData, ordersData } from "../lib/data/data";
import { Fragment } from "react";

export default function ExamplePage() {
  const [member, setMember] = useState([]);

  const [user, setUser] = useState([]);

  function handleUsersWithOrders() {
    const result = userData.map((user) => {
      return {
        ...user,
        orders: HandleOrdersWithUser(user.userId),
      };
    });
    setUser(result);
  }

  function HandleOrdersWithUser(id) {
    return ordersData.filter((order) => order.userId === id);
  }

  useEffect(() => {
    (async function getEmpData() {
      const response = await axios({
        url: "https://orangeapi.orange-electronic.com/api/GetDeptEmp",
        method: "POST",
        data: {
          DeptId: "", //部門代號
          EmpId: "", //工號
          Company: "", //公司
        },
      });
      setMember(response.data);
    })();
    handleUsersWithOrders();
    
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {member?.map((empData) => {
        return (
          <Fragment key={empData.EmpId}>
            <Card empData={empData} />
          </Fragment>
        );
      })}
    </div>
  );
}
