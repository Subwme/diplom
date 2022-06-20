import "./product.css";
import { Link } from "react-router-dom";
import { List } from "antd";

interface IProps {
  title: string;
  description: string;
  content: number;
  id: string;
  avatar: string;
}

export const Product = ({ data }: { data: IProps[] }) => {
  const count = data.length;
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={count < 4 ? false : { pageSize: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[<Link to={`/product/${item.id}`}>Перейти к товару</Link>]}
          extra={<img width={150} alt="logo" src={item.avatar} />}
        >
          <List.Item.Meta
            title={item.title}
            description={<p>Описание: {item.description}</p>}
          />
          <p>Стоимость: {item.content}</p>
        </List.Item>
      )}
    />
  );
};
