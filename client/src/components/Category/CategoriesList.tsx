import { useAppDispatch, useAppSelector } from "../../store";
import { setSelectedCategoryAction } from "../../store/reducers/reducer";

import "./category.css";

export const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const handleSelectedCategory = (id: string) => {
    dispatch(setSelectedCategoryAction(id));
  };
  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category._id}
          className="category-list__button"
          onClick={() => handleSelectedCategory(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
