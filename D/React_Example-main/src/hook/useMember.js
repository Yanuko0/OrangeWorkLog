import React, { createContext, useReducer, useContext } from "react";

function memberReducer(state, action) {
  switch (action.type) {
    case "ADD_MEMBER":
      return {
        ...state,
        members: action.payload,
      };
    case "REMOVE_MEMBER":
      return {
        ...state,
        members: [],
      };
    default:
      return state;
  }
}

const MemberContext = createContext([]);

export const MemberProvider = ({ children }) => {
  const [member, dispatch] = useReducer(memberReducer, { members: "" });

  return (
    <MemberContext.Provider value={{ member, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMember must be used within a MemberProvider");
  }
  return context;
};
