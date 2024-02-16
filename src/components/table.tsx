import { Button, Card, Checkbox, Typography } from "@material-tailwind/react";
import { IProduct } from "../types/productTypes";
import { ShowSellingModal } from "./showSellingModal";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteSingleProductMutation } from "../redux/module/product/productApi";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import Loader from "./loader";
import toast from "react-hot-toast";
import { UpdateOrAdd } from "./update-or-add";
export const Table = ({ allProducts }: { allProducts: IProduct[] }) => {
  const [productIds, setProductIds] = useState<string[]>([]);
  const TABLE_HEAD: string[] = [
    "Model",
    "Image",
    "Available",
    "Price",
    "View",
    "Sell",
    "Duplicate & Edit",
    "Delete",
  ];
  console.log(allProducts, "All products");
  const { token } = useAppSelector((state) => state.user);
  const [deleteProduct, { isError, isLoading, isSuccess }] =
    useDeleteSingleProductMutation();
  useEffect(() => {
    if (isLoading) <Loader />;
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) toast.success("Deleted successfull");
  }, [isSuccess]);
  useEffect(() => {
    if (isError) toast.error("Something is wrong");
  }, [isError]);
  function toggleStringInArray(value: string) {
    const index = productIds.indexOf(value);
    if (index !== -1) {
      // If the value is in the array, remove it
      const newArray = [...productIds];
      newArray.splice(index, 1);
      setProductIds(newArray);
    } else {
      // If the value is not in the array, add it
      setProductIds([...productIds, value]);
    }
  }
  const deleteMultiple = () => {
    productIds.map((id) => deleteProduct({ id, token }));
    setProductIds([]);
  };

  return (
    <Card placeholder={""} className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {productIds.length > 0 ? (
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Button
                  placeholder={""}
                  onClick={deleteMultiple}
                  color="red"
                  variant="outlined"
                >
                  Delete
                </Button>
              </th>
            ) : (
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
            )}
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allProducts.map(
            ({ productName, _id, price, quantity, image, model }, index) => {
              const isLast = index === allProducts.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex gap-4 items-center"
                    >
                      <Checkbox
                        onClick={() => toggleStringInArray(_id!)}
                        checked={productIds.includes(_id!)}
                        crossOrigin={""}
                        onChange={() => {}}
                      />

                      {productName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {model}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <img
                        className="h-11 w-11 rounded-full object-cover object-center"
                        src={image}
                        alt="nature image"
                      />
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Link to={`/product/${_id}`}>
                      <Typography
                        placeholder={""}
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        View
                      </Typography>
                    </Link>
                  </td>
                  <td className={classes}>
                    <ShowSellingModal id={_id!} />
                  </td>
                  <td className={classes}>
                    <UpdateOrAdd id={_id!} />
                  </td>
                  <td
                    className={classes}
                    onClick={() => deleteProduct({ id: _id, token })}
                  >
                    <TrashIcon className="w-5 text-red-200 hover:text-red-600 transition-all duration-200  cursor-pointer" />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};
