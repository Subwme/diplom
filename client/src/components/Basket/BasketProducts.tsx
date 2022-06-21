import { useAppDispatch } from "../../store";
import { removeProductFromBasketAction } from "../../store/reducers/reducer";
import { Avatar, Button, List, Space } from "antd";
import "./basket.css";

interface IProps {
  title: string;
  content: number;
  id: string;
  avatar: string;
  amount: number;
  count?: number;
  total?: number;
}

export const BasketProducts = ({ data }: { data: IProps[] }) => {
  const dispath = useAppDispatch();
  const count = data.length;
  
  return (
    <>
      <List
        itemLayout="horizontal"
        size="large"
        pagination={count <= 4 ? false : { pageSize: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                danger
                onClick={() => dispath(removeProductFromBasketAction(item.id))}
              >
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              avatar={<Avatar src={item.avatar} shape="square" size={82} />}
            />
            <Space wrap={true} direction="vertical" size="small">
              <div className="basket-item-text">
                <p className="item-text">Стоимость: {item.content}</p>
                <p className="item-text">Количестко: {item.count}</p>
                <p className="item-text">На складе: {item.amount}</p>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </>
  );
};
