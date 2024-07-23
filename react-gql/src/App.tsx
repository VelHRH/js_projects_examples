import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-900 text-white font-primaryBold fixed">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
