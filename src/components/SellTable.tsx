import { Card, Typography } from "@material-tailwind/react";
import { useAppSelector } from "../redux/hooks";
import { useGetAllSellQuery } from "../redux/module/sell/sellApi";
import { useEffect } from "react";
import Loader from "./loader";
import toast from "react-hot-toast";

const TABLE_HEAD = [
  "User Image",
  "Name",
  "Product Name",
  "Product Image",
  "Quantity",
  "Date",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export function SellTable() {
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetAllSellQuery(
    { token },
    {
      pollingInterval: import.meta.env.VITE_POLLING,
    }
  );
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong please reload");
    }
  }, [isError]);
  useEffect(() => {
    if (isLoading) {
      <Loader />;
    }
  }, [isLoading]);
  return (
    <Card placeholder={""} className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
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
          {data?.data.map(
            (
              {
                productId,
                userId,
                quantity,
                createdAt,
              }: {
                productId: {
                  image: string;
                  productName: string;
                };
                userId: {
                  image: string;
                  name: string;
                };
                quantity: number;
                createdAt: string;
              },
              index: number
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const date = new Date(createdAt);
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={createdAt}>
                  <td className={classes}>
                    <img
                      className="h-7 w-7 rounded-full object-cover object-center"
                      src={userId?.image}
                      alt="nature image"
                    />
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {userId?.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {" "}
                    <img
                      className="h-11 w-11 rounded-full object-cover object-center"
                      src={productId?.image}
                      alt="nature image"
                    />
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {productId?.productName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      placeholder={""}
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {date.toLocaleDateString()}
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
