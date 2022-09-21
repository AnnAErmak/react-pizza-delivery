import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const { searchValue } = useContext(SearchContext);
  const pizzas = items
    .filter((pizza) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoader(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const search = searchValue ? `search=${searchValue}` : "";

    axios
      .get(
        `https://632856a8a2e90dab7bddbdbc.mockapi.io/api/v1/items?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=desc`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoader
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
