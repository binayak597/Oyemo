import { useState } from "react";
import ExploreMenu from "../comonents/ExploreMenu";
import Header from "../comonents/Header";
import FoodDisplay from "../comonents/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  );
};

export default Home;
