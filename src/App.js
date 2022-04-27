import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewAssets from "./components/ViewAssets";
import AddCategory from "./components/AddCategory";
import ItemsEntry from "./components/ItemsEntry";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Dummy from "./components/Dummy";

function App() {
  const role = localStorage.getItem("Role");
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            {(function () {
              switch (role) {
                case "superintendent":
                  return (
                    <>
                      <Route path="/ViewAssets" element={<ViewAssets />} />
                      <Route path="/AddCategory" element={<AddCategory />} />
                      <Route path="/ItemsEntry" element={<ItemsEntry />} />
                      <Route path="/Dashboard" element={<Dashboard />} />
                    </>
                  );
                case "HOD":
                  return (
                    <>
                      <Route path="/Dummy" element={<Dummy />} />
                      {/* <Route path="/AddCategory" element={<AddCategory />} /> */}
                      {/* <Route path="/ItemsEntry" element={<ItemsEntry />} /> */}
                      <Route path="/Dashboards" element={<ItemsEntry />} />
                    </>
                  );
                case "assigner":
                  return (
                    <>
                      <Route path="/Dummy" element={<Dummy />} />
                      {/* <Route path="/AddCategory" element={<AddCategory />} /> */}
                      {/* <Route path="/ItemsEntry" element={<ItemsEntry />} /> */}
                      <Route path="/Dashboards" element={<ItemsEntry />} />
                    </>
                  );
                default:
                  break;
              }
            })()}
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
