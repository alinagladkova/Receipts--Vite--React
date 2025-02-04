import Receipt from "../Receipt/Receipt";
import cn from "classnames";
import styles from "./receiptsList.module.scss";

export default function ReceiptsList() {
  return (
    <div className={cn(styles[`receipts-list`])}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quaerat fuga, reiciendis nesciunt debitis fugiat veritatis cum exercitationem! Fugit
      voluptatum voluptas labore tenetur similique molestias aperiam aliquam aspernatur, ipsam doloribus.
      <Receipt />
    </div>
  );
}
