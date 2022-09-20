import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={1}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="270" rx="3" ry="3" width="240" height="16" />
    <rect x="0" y="302" rx="3" ry="3" width="241" height="41" />
    <rect x="0" y="367" rx="3" ry="3" width="92" height="42" />
    <rect x="117" y="364" rx="3" ry="3" width="125" height="51" />
    <circle cx="122" cy="122" r="122" />
  </ContentLoader>
);

export default Skeleton;
