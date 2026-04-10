import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import CreateCompany from './components/pages/createCompany';
import InviteEmployee from './components/pages/InviteEmployee';
import RegisterInvite from './components/pages/RegisterInvite';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';
import AllProducts from './components/pages/AllProducts';
import CompanyDetails from './components/pages/CompanyDetails';
import Products from './components/pages/Products';
import { ToastContainer } from 'react-toastify';
import CompanyUsers from './components/pages/CompanyUsers';
import CreateProduct from './components/pages/CreateProduct';

const App = () => {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route 
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path='/create-company'
          element={
            <RoleRoute allowedRoles={["superadmin"]}>
              <CreateCompany />
            </RoleRoute>
          }
        />
        
        <Route 
          path='/invite'
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <InviteEmployee />
            </RoleRoute>
          }
        />
        <Route path='/register/:token' element={<RegisterInvite/>} />

        <Route path='/products' element={<Products/>} />

        <Route path='/all-produtcs' element={<AllProducts/>} />

        <Route path='/cerate-product' element={<CreateProduct/>} />

        <Route path='/company/:id' element={<CompanyDetails/>} />

        <Route path='/company/:id/comp-users' element={<CompanyUsers/>} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
