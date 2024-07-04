<!-- 6/14 -->
生成新的數組不用到原數組的排序工具
<!--
npm i lodash
生成新的數組不用到原數組的排序工具

import _ from 'lodash'

setCommentList(_.orderBy(commentList, 'like',"desc"))

desc是排序方式倒序排
like是以什麼去排
commentList是數組

也可以
//改默認排序
const [commentList, setCommentList] = useState(_.orderBy(list,"like",'desc'))
-->

classnames優化類名控制

<!-- npm install classnames -->

<!-- import classNames from 'classnames' -->
<!-- 
<span 
key={item.type}
onClick={() => handleTabChange(item.type)}
className={`nav-item ${type === item.type && 'active'}`}>
{item.text}
</span> 
-->

<!-- 

className={classNames("nav-item" ,{active:type === item.type})}
nav-item是靜態類名
active:type === item.type
active:動態類名key表示要控制的類名
type === item.type:value表示條件
true時類名顯示

-->

// uuid
  // rpid要求一個唯一的隨機數
<!-- https://www.npmjs.com/package/uuid -->
<!-- npm i uuid -->
<!-- import { v4 as uuidv4 } from 'uuid'; -->
<!-- uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' -->


  // dayjs
  // ctime要求以當前時間為標準
  <!-- https://www.npmjs.com/package/dayjs -->
  <!-- npm i dayjs -->
  <!-- import dayjs from 'dayjs' -->
  <!-- dayjs(new Date()).format('MM-DD hh:mm'),  -->


  