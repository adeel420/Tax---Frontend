import React from "react";
import { BounceLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 ">
      <BounceLoader color="#1a327c" margin={4} />
    </div>
  );
};

export default Loader;
