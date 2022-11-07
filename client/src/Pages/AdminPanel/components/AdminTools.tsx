import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../../../utils/apiProvider";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addedProductAction,
  selectEditProductAction,
  setUpdateProductAction,
} from "../../../store/reducers/reducer";
import { IProduct } from "../../../types";
import "../adminpanel.css";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const currentProductId = useAppSelector((state) => state.selecteEditProduct);
  const products = useAppSelector((state) => state.products);
  const categories = useAppSelector((state) => state.categories);
  const [draft, setDraft] = useState(blank);

  useEffect(() => {
    const currentProduct = products.find((p) => p._id === currentProductId);
    if (currentProduct === null || currentProduct === undefined) {
      setDraft(blank);
      return;
    }
    setDraft({
      _id: currentProduct._id,
      description: currentProduct.description,
      name: currentProduct.name,
      category: currentProduct.category,
      price: currentProduct.price,
      amount: currentProduct.amount,
      image: currentProduct.image,
    });
  }, [currentProductId, products, setDraft]);

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
        .catch(({ message }: { message: string }) => {
          if (message === "Oops something went wrong") {
            history.push("/404");
          }
        });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleChangeSelect = (value: string) => {
    setDraft({ ...draft, category: value });
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
        <Form.Item label="Категория">
          <Select
            value={draft.category}
            placeholder="Категория"
            onChange={handleChangeSelect}
          >
            {categories.map((category) => {
              return (
                <Select.Option value={category._id} key={category._id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
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
