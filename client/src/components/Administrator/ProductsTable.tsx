import { deleteProduct } from "../../apiProvider";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  removeProductFromAdminAction,
  selectEditProductAction,
} from "../../store/reducers/reducer";
import { IProduct } from "../../types";
import { Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType, TableProps } from "antd/lib/table";

interface IDataType {
  id: number;
  key: string;
  name: string;
  category: string | null;
  price: number;
  amount: number;
}

export const ProductsTable = ({ products }: { products: IProduct[] }) => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const columns: ColumnsType<IDataType> = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Наименование",
      dataIndex: "name",
    },
    {
      title: "Категория",
      dataIndex: "category",
    },
    {
      title: "Стоимость",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
    {
      title: "Количество",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
      },
    },
    {
      title: "Действие",
      dataIndex: "",
      key: "x",
      render: ({ key }) => (
        <Space direction="horizontal">
          <EditOutlined
            style={{ color: "#228B22", fontSize: 20 }}
            onClick={() => editProduct(key)}
          />
          <DeleteOutlined
            style={{ color: "#ff0000", fontSize: 20 }}
            onClick={() => removeProduct(key)}
          />
        </Space>
      ),
    },
  ];

  const getCategoryName = (id: string): string | null => {
    const category = categories.find((c) => {
      return c._id === id;
    });
    if (category === undefined) {
      return null;
    }
    return category.name;
  };

  const data: IDataType[] = products.map((p, index) => ({
    id: index + 1,
    key: p._id,
    name: p.name,
    category: getCategoryName(p.category),
    price: p.price,
    amount: p.amount,
  }));

  const dataLength = data.length;
  const editProduct = (id: string) => {
    dispatch(selectEditProductAction(id));
  };

  const removeProduct = (id: string) => {
    deleteProduct(id)
      .then(() => {
        dispatch(removeProductFromAdminAction(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChange: TableProps<IDataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      scroll={dataLength > 7 ? { y: 400 } : undefined}
      onChange={onChange}
    />
  );
};
