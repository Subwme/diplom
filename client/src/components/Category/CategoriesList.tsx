import { useAppDispatch, useAppSelector } from "../../store";
import {
  setSearchTextAction,
  setSelectedCategoryAction,
} from "../../store/reducers/reducer";
import { Button, Space } from "antd";
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
    <Space direction="vertical" align="center">
      <div className="category-list-button">
        {categories.map((category) => (
          <Button
            size="middle"
            className="category-filter-button"
            key={category._id}
            onClick={() => handleSelectedCategory(category._id)}
            block={true}
          >
            {category.name}
          </Button>
        ))}
        <Button
          size="middle"
          className="category-filter-button"
          onClick={clearFilters}
          block={true}
        >
          Сбросить фильтры
        </Button>
      </div>
    </Space>
  );
};
