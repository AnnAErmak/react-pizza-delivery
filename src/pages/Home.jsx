import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch("https://632856a8a2e90dab7bddbdbc.mockapi.io/api/v1/items")
      .then((data) => data.json())
      .then((json) => {
        setItems(json);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoader
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Home;
