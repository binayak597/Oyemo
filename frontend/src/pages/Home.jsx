import { useState } from "react";
import ExploreMenu from "../comonents/ExploreMenu";
import Header from "../comonents/Header";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
