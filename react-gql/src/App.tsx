import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Product from "./components/Product";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Product name="Cola" price={5} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
