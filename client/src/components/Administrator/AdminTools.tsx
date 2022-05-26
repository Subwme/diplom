import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../../apiProvider";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addedProductAction,
  selectEditProductAction,
  setUpdateProductAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";

const blank: IProduct = {
  description: "",
  _id: "",
  name: "Имя",
  category: "",
  price: 0,
  amount: 0,
  image: "url",
};

export const AdminTools = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const [draft, setDraft] = useState(blank);

  const selectProductFromAdmin = useAppSelector((state) =>
    products.find((p) => p._id === state.selecteEditProduct)
  );

  const options = categories.map((category) => {
    return (
      <option value={category._id} key={category._id}>
        {category.name}
      </option>
    );
  });

  useEffect(() => {
    if (
      selectProductFromAdmin === null ||
      selectProductFromAdmin === undefined
    ) {
      setDraft(blank);
      return;
    }
    setDraft({
      _id: selectProductFromAdmin._id,
      description: selectProductFromAdmin.description,
      name: selectProductFromAdmin.name,
      category: selectProductFromAdmin.category,
      price: selectProductFromAdmin.price,
      amount: selectProductFromAdmin.amount,
      image: selectProductFromAdmin.image,
    });
  }, [selectProductFromAdmin]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft._id !== "") {
      updateProduct(draft)
        .then((product) => {
          dispatch(setUpdateProductAction(product));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (draft._id === "") {
      const newProduct = {
        description: draft.description,
        name: draft.name,
        category: draft.category,
        price: draft.price,
        amount: draft.amount,
        image: draft.image,
      };
      addProduct(newProduct)
        .then((product) => {
          dispatch(addedProductAction(product));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  return (
    <form className="admin-tools" onSubmit={handleSubmit}>
      <label className="admin-tools-label-name">
        Наименование
        <input
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
        />
      </label>
      <label className="admin-tools-label-name">
        Описание
        <input
          name="description"
          type="text"
          value={draft.description}
          onChange={handleChange}
        />
      </label>
      <label className="admin-tools-label-name">
        Категория
        <select
          className="admin-select"
          name="category"
          value={draft.category}
          onChange={handleChange}
        >
          <option value={draft.category} disabled hidden>
            {
              (
                categories.find((c) => c._id === draft.category) || {
                  name: "Категория",
                }
              ).name
            }
          </option>
          {options}
        </select>
      </label>
      <label className="admin-tools-label-name">
        Стоимость
        <input
          name="price"
          type="text"
          value={draft.price}
          onChange={handleChange}
        />
      </label>
      <label className="admin-tools-label-name">
        Кол-во
        <input
          name="amount"
          type="text"
          value={draft.amount}
          onChange={handleChange}
        />
      </label>
      <label className="admin-tools-label-name">
        Изображение
        <input
          name="image"
          type="text"
          value={draft.image}
          onChange={handleChange}
        />
      </label>
      {draft._id === "" ? (
        <button className="form-submit-admin__btn" type="submit">
          Добавить
        </button>
      ) : (
        <div className="admin-tools-btns">
          <button className="form-submit-admin__btn" type="submit">
            Сохранить
          </button>
          <button
            onClick={() => dispatch(selectEditProductAction(""))}
            className="form-cancel-admin__btn"
          >
            Отмена
          </button>
        </div>
      )}
    </form>
  );
};
