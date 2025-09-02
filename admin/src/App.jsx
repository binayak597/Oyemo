import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { StoreContext } from "./context/StoreContext";
import Add from "./pages/Add";
import Auth from "./pages/Auth";
import List from "./pages/List";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
const App = () => {
  const { token, loading } = useContext(StoreContext);

  if (loading)
    return <div className="p-4 text-center">Checking authentication...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {token && (
        <>
          <Navbar />
          <hr className="border-gray-200" />
        </>
      )}
      <div className="flex w-full min-h-screen overflow-hidden">
        {token && <Sidebar />}
        <div className="flex-1 bg-white lg:ml-0 pt-16 lg:pt-0">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={token ? <Add /> : <Navigate to="/auth" />}
            />
            <Route
              path="/add"
              element={token ? <Add /> : <Navigate to="/auth" />}
            />
            <Route
              path="/list"
              element={token ? <List /> : <Navigate to="/auth" />}
            />
            <Route
              path="/orders"
              element={token ? <Orders /> : <Navigate to="/auth" />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
