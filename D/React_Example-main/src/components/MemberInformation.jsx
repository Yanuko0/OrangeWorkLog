import React from "react";

export default function MemberInformation({ empData }) {
  const [emp] = empData;
  return (
    <div className="p-4 border border-slate-400 rounded-md bg-slate-300 h-[400px] shadow-md flex-col space-y-4 text-center">
      <h1 className="text-2xl font-semibold me-2">{emp?.FullName}</h1>
      <h2 className="text-lg font-semibold">{emp?.EmpId}</h2>
      <small>{emp?.ResourcesName}</small>
      <p>{emp?.empId}</p>
      <p>{emp?.DeptName}</p>
      <p>{emp?.Title}</p>
      <p>{emp?.Email}</p>
      <button className="bg-blue-500 text-sm text-center p-4 border rounded-lg max-w-sm hover:bg-blue-400">
        詳細資料
      </button>
    </div>
  );
}
