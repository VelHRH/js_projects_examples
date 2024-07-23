import React, { FC } from "react";

interface ProductProps {
  name: string;
  price: number;
}

const Product: FC<ProductProps> = ({ name, price }) => {
  return (
    <div className="m-5 bg-slate-950 border-2 border-slate-700 rounded-lg mx-auto">
      <p className="text-2xl text-green-500 p-5">{name}</p>
      {price}
    </div>
  );
};

export default Product;
