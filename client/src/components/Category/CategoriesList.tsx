import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSelectedCategoryAction,
} from "../../store/reducers/reducer";
import { Button } from "antd";
import "./category.css";

export const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const handleSelectedCategory = (id: string) => {
    dispatch(setSelectedCategoryAction(id));
  };

  const clearFilters = () => {
    dispatch(setSelectedCategoryAction(""));
    dispatch(setSearchTextAction(""));
  };
  return (
    <div className="category-list">
      {categories.map((category) => (
        <Button
          size="small"
          className="category-filter-button"
          key={category._id}
          onClick={() => handleSelectedCategory(category._id)}
        >
          {category.name}
        </Button>
      ))}
      <Button
        size="small"
        className="category-filter-button"
        onClick={clearFilters}
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};
