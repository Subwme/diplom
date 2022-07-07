import "./product.css";
import { Link } from "react-router-dom";
import { List } from "antd";
import { IProduct } from "../../types";

export const Product = ({ data }: { data: IProduct[] }) => {
  const count = data.length;
  return (
    <>dsdgd</>
    // <List
    //   itemLayout="vertical"
    //   size="small"
    //   pagination={count <= 4 ? false : { pageSize: 4 }}
    //   dataSource={data}
    //   renderItem={(item) => (
    //     <List.Item
    //       key={item._id}
    //       actions={[<Link to={`/product/${item._id}`}>Перейти к товару</Link>]}
    //       extra={<img width={150} alt="logo" src={item.image} />}
    //     >
    //       <List.Item.Meta
    //         title={item.name}
    //         description={<p>Описание: {item.description}</p>}
    //       />
    //       <p>Стоимость: {item.description}</p>
    //     </List.Item>
    //   )}
    // />
  );
};
