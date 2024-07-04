import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiBlueprint } from "react-icons/si";
//function scope

const Card = ({ empData }) => {
  //initial state
  return (
    <div className="p-4 border border-slate-400 rounded-md bg-slate-300 h-[400px] shadow-md flex-col space-y-4 text-center">
      <SiBlueprint />
      <h1 className="text-2xl font-semibold me-2">{empData?.FullName}</h1>
      <h2 className="text-lg font-semibold">{empData?.EmpId}</h2>
      <Link to={`/detail/${empData.EmpId}`}>
        <button className="bg-blue-500 text-sm text-center p-4 border rounded-lg max-w-sm hover:bg-blue-400">
          詳細資料
        </button>
      </Link>
    </div>
  );
};
export default Card;
