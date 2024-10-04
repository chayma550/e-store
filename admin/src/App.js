import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import {   productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/regiser/Register";
import { deliveryColumns, orderColumns, productColumns, userColumns } from "./datatablesource";
import NewProduct from "./pages/new Product/NewProduct";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Profile from "./pages/UpdateProfile/Profile";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import SingleOrder from "./pages/singleOrder/singleOrder";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute=({children})=>{
 const{currentUser}=useContext(AuthContext)
 if(!currentUser){
  return <Navigate to="/login"/>
 }
 return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
            <ProtectedRoute>
              <Home />
              </ProtectedRoute>

              } />
            <Route path="register" element={<Register />} />

            <Route path="users">
              <Route index element={
               <ProtectedRoute>

                <List columns={userColumns}/>
                </ProtectedRoute>
                } />
              <Route path="/users/:id" element={<Single />} />

              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={
               <ProtectedRoute>

                <List columns={orderColumns}/>
                </ProtectedRoute>
                } />
              <Route path="/orders/:id" element={<SingleOrder />} />

              </Route>

            

            <Route path="products">
              <Route index element={
              <ProtectedRoute>

                <List columns={productColumns} />
                </ProtectedRoute>
                } />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route
                path="newproduct"
                element={<NewProduct inputs={ productInputs} title="Add New Product" />}
                
              />

               <Route
                path="new"
                element={<NewProduct  />}
              />
            </Route>
          </Route>
          <Route path="/profile" element={<Profile />} />

          <Route path="/edit/:id" element={<UpdateProduct />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
