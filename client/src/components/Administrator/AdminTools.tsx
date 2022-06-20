import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../../apiProvider";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addedProductAction,
  selectEditProductAction,
  setUpdateProductAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import "./Adminpanel.css";

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

  const handleSubmit = () => {
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  return (
    <Space className="admin-tools">
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item label="Наименование">
          <Input
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Описание">
          <Input
            name="description"
            type="text"
            value={draft.description}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          {/* <Form.Item name="category">
              <Select
              defaultActiveFirstOption={true}
                defaultValue={
                  (
                    categories.find((c) => c._id === draft.category) || {
                      name: "Категория",
                    }
                  ).name
                }
                onChange={handleChange}
              >
                {options}
              </Select>
            </Form.Item> */}
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
        </Form.Item>
        <Form.Item label="Стоимость">
          <Input
            name="price"
            type="text"
            value={draft.price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Количество">
          <Input
            name="amount"
            type="text"
            value={draft.amount}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Изображение">
          <Input
            name="image"
            type="text"
            value={draft.image}
            onChange={handleChange}
          />
        </Form.Item>
        {draft._id === "" ? (
          <Row>
            <Col span={10} offset={6}>
              <Button type="primary" htmlType="submit">
                Добавить
              </Button>
            </Col>
          </Row>
        ) : (
          <div className="admin-tools-button">
            <Row justify="center">
              <Col span={24}>
                <Button
                  className="admin-tools-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Сохранить
                </Button>
                <Button
                  type="primary"
                  onClick={() => dispatch(selectEditProductAction(""))}
                  danger
                >
                  Отмена
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Form>
    </Space>
  );
};
