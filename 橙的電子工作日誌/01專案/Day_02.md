4/17

Day_02:

(1)npm install

有時候githube下載下來有限制一些package.json沒有安裝可執行
npm install
來進行重新安裝。

(2)安裝https://desktop.github.com/
來管理專案

(3) Udemy有課程可以看 https://www.udemy.com/zh-tw/

(4) 立即執行函數
const asy2 = async () => {
    await (async() => {
        await(() => {
            console.log(3);
            <!-- //後面有() 就是立即執行函數會直接先執行 -->
        })();
        console.log(4)
    })
}

(5) React hooks 
<!-- 通常用use開頭函式 useState是創建一個空陣列:初始值:函數 -->
 const [emp, setEmp] = useState([]);
 async function getEmpData() {
    const response = await axios({
      url: "https://orangeapi.orange-electronic.com/api/GetDeptEmp",
      method: "POST",
      data: {
        DeptId: "", //部門代號
        EmpId: "224005", //工號
        Company: "", //公司
      },
    });
    const [data] = response.data; 
    const { EmpName } = data;
    setEmp(EmpName);
  }

<!-- 一開始emp為空值,調用setEmp方法來刷新頁面。 -->

(6) 寫typescript 判斷資料型別
<!-- 安裝 -->
npm install -g typescript
<!-- 以ts為後綴 -->
tsc hello.tsx
<!-- react中以.tsx為後綴 -->

(7) 實作API串員工資料 注意因為需要陣列所以不需要解構
再用map方法列出員工資料,修改css import "./App.css";

(8)實作將兩筆資料，判斷是否有相同的userID匯出三筆資料
再印出再畫面上
先用一個function用map遍歷id是否有相符資料再用一個變數去接
再用一個function把資料...str,orderid:,price:


githube:steven31518