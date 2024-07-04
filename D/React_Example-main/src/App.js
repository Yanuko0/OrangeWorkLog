import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import ExamplePage from "./pages/ExamplePage";
import ExampleDetailPage from "./pages/ExampleDetailPage";
import ContextExamplePage from "./pages/ContextExamplePage";
import TimerPage from "./pages/TimerPage";
import "./gobal.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="example" element={<ContextExamplePage />}></Route>
        <Route path="detail/:id" element={<ExampleDetailPage />} />
        <Route path="timer" element={<TimerPage />} />
      </Route>
    </Routes>
  );
}

export default App;
