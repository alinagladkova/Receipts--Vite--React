import cn from "classnames";
import styles from "./form.module.scss";

export default function Form({ children, preventDefault, method, action }) {
  const handleSubmit = (e) => {
    preventDefault && e.preventDefault();
    console.log("submit", name);

    // const data = new FormData(e.target)
  };

  return (
    <form className={cn(styles.form)} method={method} action={action} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
