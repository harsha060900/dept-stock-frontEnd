import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewAssets from "./components/ViewAssets";
import AddCategory from "./components/AddCategory";
import ItemsEntry from "./components/ItemsEntry";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AcknowledgeEntry from "./components/AcknowledgeEntry";
import StatusTracker from "./components/StatusTracker";
import AddLocation from "./components/AddLocation";
import ErrorPage from "./components/404ErrorPage";
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
                      <Route path="*" element={<ErrorPage />} />
                    </>
                  );
                case "HOD":
                  return (
                    <>
                      <Route path="/ViewAssets" element={<ViewAssets />} />
                      {/* <Route path="/AddCategory" element={<AddCategory />} /> */}
                      {/* <Route path="/ItemsEntry" element={<ItemsEntry />} /> */}
                      <Route path="/Dashboard" element={<Dashboard />} />
                      <Route path="*" element={<ErrorPage />} />
                    </>
                  );
                case "assigner":
                  return (
                    <>
                      <Route path="/ViewAssets" element={<ViewAssets />} />
                      <Route path="/AcknowledgeEntry" element={<AcknowledgeEntry />} />
                      <Route path="/StatusTracker" element={<StatusTracker />} />
                      <Route path="/AddLocation" element={<AddLocation />} />
                      <Route path="*" element={<ErrorPage />} />
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
