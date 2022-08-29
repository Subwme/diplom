import { Button } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addedCommentAction } from "../../store/reducers/reducer";
import { IComment } from "../../types";
import { addComment } from "../../utils/apiProvider";

export const CommentForm = ({ productId }: { productId: string }) => {
  const productComments = useAppSelector((state) =>
    state.comments.filter((c) => c.productId === productId)
  );
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [text, setText] = useState<string>("");

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSendComment = () => {
    const newComment: IComment = {
      content: text,
      userId: user?._id,
      productId: productId,
    };
    addComment(newComment)
      .then((comment) => {
        console.log(comment);
        dispatch(addedCommentAction(comment));
        setText("");
      })
      .catch(({ message }: { message: string }) => {
        if (message === "Oops something went wrong") {
          history.push("/404");
        }
      });
  };

  return (
    <div>
      <textarea
        name="comment"
        id="comment"
        style={{ width: 150, height: 100 }}
        value={text}
        onChange={handleChangeText}
      />
      <Button size="small" onClick={handleSendComment}>
        Отправить
      </Button>
      {productComments.map((c) => (
        <div key={c._id}>{c.content}</div>
      ))}
    </div>
  );
};
