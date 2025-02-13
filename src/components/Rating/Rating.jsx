import cn from "classnames";
import styles from "./rating.module.scss";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";

export default function Rating({ defaultRating, maxValue }) {
  console.log(defaultRating);

  return (
    <div className={cn(styles.rating)}>
      {[...Array(maxValue)].map((star, i) => {
        i += 1;

        if (i < Math.floor(defaultRating)) {
          return (
            <div className={cn(styles[`rating__star`])} key={i}>
              <IoMdStar />
            </div>
          ); // Полностью закрашенная звезда
        } else if (i < Math.ceil(defaultRating)) {
          return (
            <div className={cn(styles[`rating__star`])} key={i}>
              <IoMdStarHalf />
            </div>
          ); // Полузакрашенная звезда
        } else {
          return (
            <div className={cn(styles[`rating__star`])} key={i}>
              <IoIosStarOutline />
            </div>
          ); // Незакрашенная звезда
        }
      })}
    </div>
  );
}
{
  /* <IoMdStar />; */
  // <IoMdStarHalf />;
}
