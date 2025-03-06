import cn from "classnames";
import styles from "./rating.module.scss";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";
import { cloneElement } from "react";
import React from "react";

export default function Rating({ defaultRating, maxValue }) {
  const generateStars = (rating) => {
    const fullStars = Math.trunc(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxValue - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[]
          .concat(...[...Array(fullStars)].fill(<IoMdStar color="rgb(255, 166, 0)" />))
          .concat(halfStar ? <IoMdStarHalf color="rgb(255, 166, 0)" /> : <></>)
          .concat(...[...Array(emptyStars)].fill(<IoIosStarOutline color="rgb(255, 166, 0)" />))
          .map((child, i) => {
            return cloneElement(child, {
              key: i,
            });
          })}
      </>
    );
  };

  return <div className={cn(styles.rating)}>{generateStars(defaultRating)}</div>;
}
