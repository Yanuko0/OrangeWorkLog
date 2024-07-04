import React from "react";
import { useMember } from "../hook/useMember";
export default function ComponentB() {
  const { member } = useMember();
  
  return (
    <div style={{backgroundColor:"#ff9900"}}>
      <h1>ComponentB</h1>
      <p>{member?.members[0]?.EmpName}</p>
      <p>{member?.members[0]?.EmpId}</p>
    </div>
  );
}
