import { FC } from "react";
import Button from "../components/Button";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../apollo/querries/user";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const Users: FC = () => {
  const { data, error } = useQuery(GET_ALL_USERS);
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex justify-between w-full">
        <p className="text-3xl">Users:</p>
        <Link to="/users/add">
          <Button>Add</Button>
        </Link>
      </div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-4 gap-5 w-full">
          {data?.users.map((user) => (
            <Product name={user.email} price={user.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
