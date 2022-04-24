import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewAssets from './components/ViewAssets';
import AddCategory from './components/AddCategory';
import ItemsEntry from './components/ItemsEntry';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Routes>
          
            <Route exact path = "/ViewAssets" element={<ViewAssets />} />
            <Route exact path = "/" element={<Login />} />
            <Route exact path = "/AddCategory" element={<AddCategory />} />
            <Route exact path = "/ItemsEntry" element={<ItemsEntry />} />
            <Route exact path = "/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
