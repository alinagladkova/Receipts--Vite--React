import cn from "classnames";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles[`header__logo`])}>
        <img src="../../img/logo2.png" alt="img" />
      </div>
    </header>
  );
}
