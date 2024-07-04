4/23

date 日期套件
https://www.npmjs.com/package/moment

這邊通常用switch

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


(1)創建一個全域可以使用的變數
(2)一個函數state, action
初始值與action來改變裡面的值action.payload會渲染member
MemberContext = createContext([]);用MemberContext把createContext([])包起來

export const MemberProvider = ({ children }) => {
  const [member, dispatch] = useReducer(memberReducer, { members: "" });

  return (
    <MemberContext.Provider value={{ member, dispatch }}>
      {children} //可以放子元件
    </MemberContext.Provider>
  );
};

dispatch是指function-memberReducer

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMember must be used within a MemberProvider");
  }
  return context;
};
這邊是指如果沒有內容 會爆錯

回家注意看這些部分

createContext, useReducer ,useContext

useReducer

https://github.com/steven31518/React_Example/blob/main/src/hook/useMember.js

因為是在最外層所以要去index.js把
<MemberProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </MemberProvider>包起來所有
  讓所有元件都可以使用