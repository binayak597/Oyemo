
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("admin-token")) {
        setToken(localStorage.getItem("admin-token"));
      }
      if (localStorage.getItem("admin")) {
        setAdmin(localStorage.getItem("admin"));
      }
      setLoading(false)
    }
    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    loading
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;