import React from "react";
import { useMember } from "../hook/useMember";

export default function ComponentA() {
  const { member, dispatch } = useMember();

  return (
    <div style={{ backgroundColor: "#99ff00" }}>
      <p>ComponentA</p>
      <p>{member?.members[0]?.EmpName}</p>
      <p>{member?.members[0]?.EmpId}</p>
    </div>
  );
}
