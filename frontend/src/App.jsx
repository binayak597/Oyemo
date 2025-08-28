import Navbar from "./comonents/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-hidden">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
