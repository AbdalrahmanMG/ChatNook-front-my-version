// import React from "react";
import myImage from "../assets/Logo.png";

export default function Logo() {
  console.log('Logo rerender !!!!! 🚧');

  return (
    <>
      <img src={myImage} alt="" width="100px" className="mt-4 " />
    </>
  );
}
