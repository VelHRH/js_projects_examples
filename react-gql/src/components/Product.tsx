import { FC } from "react";

interface ProductProps {
  name: string;
  price: number;
}

const Product: FC<ProductProps> = ({ name, price }) => {
  return (
    <div className="p-5 bg-slate-950 border-2 border-slate-700 rounded-lg flex flex-col items-center">
      <p className="text-2xl text-green-500 font-primaryBold">{name}</p>
      <p>{price}</p>
    </div>
  );
};

export default Product;
