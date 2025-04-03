import React from "react";
import ContentLoader from "react-content-loader";

export default function Skeleton(props) {
  return (
    <ContentLoader speed={2} width={325} height={500} viewBox="0 0 325 500" backgroundColor="rgb(178, 183, 216)" foregroundColor="rgb(67, 69, 83)" {...props}>
      <rect x="30" y="20" rx="8" ry="8" width="290" height="400" />
      <rect x="30" y="450" rx="5" ry="5" width="290" height="10" />
      <rect x="30" y="475" rx="5" ry="5" width="170" height="10" />
    </ContentLoader>
  );
}
