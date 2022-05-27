import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSortByAscAction,
  setSortByDescAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import { Product } from "./Product";
import "./product.css";

export const ProductsList = () => {
  const products = useAppSelector((state) => state.products);
  const sortBy = useAppSelector((state) => state.sortBy);
  const searchText = useAppSelector((state) => state.searchText);
  const selectedCategoryName = useAppSelector(
    (state) => state.selectedCategoryName
  );
  const dispatch = useAppDispatch();
  let sortedProducts: IProduct[] = products;

  if (selectedCategoryName) {
    sortedProducts = sortedProducts.filter((product) => {
      return selectedCategoryName === product.category;
    });
  }

  if (searchText !== "") {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchText);
    });
  }

  if (sortBy === "asc") {
    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "desc") {
    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
  }

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchTextAction(event.target.value.toLowerCase()));
  };

  return (
    <div className="product-list__desk">
      <div className="product-filter">
        <input
          className="product-list__input"
          onChange={handleSearchTextChange}
          type="search"
          placeholder="Search..."
        />
        <div className="product-button-list">
          <button
            className="sort-desc__button"
            onClick={() => dispatch(setSortByAscAction())}
          >
            High
          </button>
          <button
            className="sort-asc_button"
            onClick={() => dispatch(setSortByDescAction())}
          >
            Low
          </button>
        </div>
      </div>
      <div className="products">
        {sortedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
