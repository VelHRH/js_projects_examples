import { FC } from "react";
import Product from "../components/Product";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../apollo/querries/product";

const Products: FC = () => {
  const { data, error } = useQuery(GET_ALL_PRODUCTS);
  return (
    <div className="flex flex-col items-start gap-5">
      <p className="text-3xl">Products:</p>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-4 gap-5 w-full">
          {data?.products.map((product) => (
            <Product name={product.name} price={product.price} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
