import React from "react";

export default function Wrap({ children }) {
  const text = "我要傳送資料進子層";
  return (
    <div>
      <h1>我是父層</h1>
      <div>{children}</div>
    </div>
  );
}


