4/16

Day_01:
(1) React創建專案

<!-- 初始化 -->
npm init

<!-- npx是方便安裝 -->
<!-- npx create-react-app 快速建立react + 專案名稱my-app -->
npx create-react-app my-app
<!-- cd前往資料夾 -->
cd my-app
<!-- 執行程式 -->
npm start

cd my-app → npm start

搜尋函式庫中沒有上傳到的
npm install


(2) 深拷貝/淺拷貝、連接數組

淺拷貝
const str1=[0,1,2,3,4,5]
const str2=[...str1]

let obj1 = {a: 1}
let obj2 = {...obj1}
obj1.a = 2
console.log(obj2.a) 

深拷貝
let obj1 = {a: {a: 1}}
let obj2 = JSON.parse(JSON.stringify(obj1))
obj1.a.a = 2
console.log(obj2.a)  // {a: 1}

連接數組
const str3=[...str1,name:123]

(3) async/Await串接Api

<!-- // 定義名為 Count 的 React 函式元件 -->
const Count = () => {
  <!-- // 使用 useState 鉤子定義一個名為 number 的狀態變數，初始值為 0 -->
  const [number, setNumber] = useState(0);
  <!-- // 使用 useState 鉤子定義一個名為 emp 的狀態變數，初始值為空陣列 [] -->
  const [emp, setEmp] = useState([]);

  <!-- // 定義名為 getEmpData 的異步函式，用於獲取員工資料 -->
  async function getEmpData() {
    const response = await axios({
      <!-- // 請求的 URL -->
      url: "https://orangeapi.orange-electronic.com/api/GetDeptEmp",
      <!-- // 請求方法為 POST -->
      method: "POST",
      data: {
        DeptId: "", //部門代號
        EmpId: "224005", //工號
        Company: "", //公司
      },
      <!-- // 請求的數據 -->
    });
    <!-- // {
    //     DeptId: '1100',
    //     DeptName: '總經理室',
    //     DeptName_E: 'CEO Office',
    //     EmpId: '224005',
    //     EmpName: '楊立瑜',
    //     ResourcesId: 'Orange',
    //     ResourcesName: '台灣總公司',
    //     ResourcesName_E: 'Orange-TW',
    //     Compose: '台灣總公司,1100,224005,楊立瑜',
    //     FullName: 'Li.Yu / 楊立瑜',
    //     Title: '03-工程師',
    //     Language: 'zh-TW',
    //     Email: 'li.yu@orange-electronic.com',
    //     type: '0'
    //     message:"sdsgfdg"
    //   } -->


    // 從回應中獲取員工資料

    // 從回應中獲取第一個元素
    const [data] = response.data; 
    // 從回應中獲取 EmpName
    const { EmpName } = data;
    // 更新 emp 狀態變數
    // 設置 emp 狀態變數為獲取的員工名稱
    setEmp(EmpName);
  }

  function increase() {
    setNumber((prv) => prv + 1);
  }
  function decrease() {
    setNumber((prv) => prv - 1);
  }

  <!-- // 使用 useEffect 鉤子，在初次渲染時執行 getEmpData 函式 -->
  useEffect(() => {
    <!-- // 獲取員工資料 -->
    getEmpData();
    <!-- // 空的依賴陣列 [] 表示只在初次渲染時執行 -->
  }, []);

  return (
    <div className="card">
      <div className="">{JSON.stringify(emp)}</div>
      <p>{emp}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
};
<!-- // 導出 Count 元件 -->
export default Count;



(4)React-Router多頁面應用
<!-- 父層套子層 -->

(5)src中
<!-- lib放多的js以及套件 -->
<!-- components放jsx檔 -->

網頁
npm: https://www.npmjs.com/

Tailwind CSS
:https://tailwindcss.com/docs/installation

React day1:
https://drive.google.com/file/d/13Xv7oimATEM0I-s-Lx2FKOdVWzrCcJXx/view?usp=sharing


建置環境
Color Highlight
Color Info
Console Ninja
Css Peek
Es7 React/Redux/GraphQ
ESLint
HTML CSS Support
IntelliSense for CS
JavaScript(ES6) code snip
Materal Icon Theme
Prettier Code for
SCSS Formatter
Tailwind CSS Intelli