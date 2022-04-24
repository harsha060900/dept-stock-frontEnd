import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewAssets from './components/ViewAssets';
import AddCategory from './components/AddCategory';
import ItemsEntry from './components/ItemsEntry';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ViewAsset from './components/ViewAsset';

function App() {
  const role = localStorage.getItem("Role");
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Routes>
          <Route exact path = "/login" element={<Login />} />
            {/* <Route exact path = "/ViewAssets" element={<ViewAssets />} />
            <Route exact path = "/" element={<Login />} />
            <Route exact path = "/AddCategory" element={<AddCategory />} />
            <Route exact path = "/ItemsEntry" element={<ItemsEntry />} />
            <Route exact path = "/Dashboard" element={<Dashboard />} /> */}
             {(function () {
            switch (role) {
              case "superdent":
                return (
                  <>
                    <Route path="/" element={<ViewAssets />} />
                    <Route path="/AddCategory" element={<AddCategory />} />
                    <Route path="/ItemsEntry" element={<ItemsEntry />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                  </>
                );
              case "HOD":
                return (
                  <>
                    <Route path="/" element={<ViewAsset />} />
                    {/* <Route path="/AddCategory" element={<AddCategory />} /> */}
                    {/* <Route path="/ItemsEntry" element={<ItemsEntry />} /> */}
                    <Route path="/Dashboards" element={<ItemsEntry />} />
                  </>
                );
              case "assigner":
                return (
                  <>
                    <Route path="/" element={<ViewAsset />} />
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
