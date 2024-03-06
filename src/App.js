import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Details from "./pages/details/details";
import PdfViewer from "./components/pdfpage/pdfpage";
import Todo from "./pages/todo/todo";

// import PdfViewer from "./components/pdfpage/pdfpage";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="contract">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List  />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                   <Details />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path=":filetype"
                element={
                  <ProtectedRoute>
                    <ContractDetails />
                  </ProtectedRoute>
                }
              /> */}
            </Route>
            <Route path="/todo">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Todo />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
