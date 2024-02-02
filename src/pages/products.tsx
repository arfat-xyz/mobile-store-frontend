import { Button, Input, Radio, Typography } from "@material-tailwind/react";
import { useGetAllProductsQuery } from "../redux/module/product/productApi";
import Loader from "../components/loader";
import { useState } from "react";
import { Table } from "../components/table";
import { useAppSelector } from "../redux/hooks";

const Products = () => {
  const [maxRange, setMaxRange] = useState<number>(1000000);
  const [createdAt, setCreatedAt] = useState<string>("DESC");
  const [brand, setBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [os, setOs] = useState("");
  const [storage, setStorage] = useState("");
  const [size, setSize] = useState<number>(0);
  const { token } = useAppSelector((state) => state.user);
  const { isLoading, data: allProducts } = useGetAllProductsQuery(
    {
      max: maxRange,
      createdAt,
      brand,
      searchTerm,
      os,
      size,
      storage,
      token,
    },
    {
      pollingInterval: import.meta.env.VITE_POLLING,
    }
  );

  const brandNames: string[] = ["IPhone", "Samsung", "Xiaomi"];
  const storageName: string[] = ["64", "128", "256", "512", "1024"];
  const screenSizeNumber: number[] = [6.5, 6.6, 6.7, 6.8, 6.9];
  if (isLoading) <Loader />;
  return (
    <div className="container">
      <Typography className="my-7" placeholder={""} variant="h2">
        All Products
      </Typography>
      {/* filter section  */}
      <div className="container mx-auto">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSearchTerm((e.target as HTMLFormElement).searchTerm?.value);
          }}
          className="flex gap-4 my-7 w-full"
        >
          <Input
            crossOrigin={""}
            name="searchTerm"
            size="lg"
            placeholder="Iphone"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button placeholder={""} type="submit" variant="gradient">
            Search
          </Button>
        </form>
        <div className="w-full my-7">
          <Typography className="" placeholder={""} variant="h5">
            Brand Filter
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brandNames.map((n, i) => (
              <Radio
                key={i}
                crossOrigin=""
                name="brand"
                label={n}
                onClick={() => setBrand(n)}
                color="red"
              />
            ))}
            <Radio
              crossOrigin=""
              name="brand"
              label={"All"}
              defaultChecked
              onClick={() => setBrand("")}
              color="red"
            />
          </div>
        </div>
        <div className="w-full my-7">
          <Typography className="" placeholder={""} variant="h5">
            Screen Size
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
            {screenSizeNumber.map((n, i) => (
              <Radio
                key={i}
                crossOrigin=""
                name="screen"
                label={n + "inches"}
                onClick={() => setSize(n)}
                color="red"
              />
            ))}
            <Radio
              crossOrigin=""
              name="screen"
              label={"All"}
              defaultChecked
              onClick={() => setSize(0)}
              color="red"
            />
          </div>
        </div>{" "}
        <div className="w-full my-7">
          <Typography className="" placeholder={""} variant="h5">
            Storage
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4">
            {storageName.map((n, i) => (
              <Radio
                key={i}
                crossOrigin=""
                name="storage"
                label={n + " GB"}
                onClick={() => setStorage(n + " GB")}
                color="red"
              />
            ))}
            <Radio
              crossOrigin=""
              name="storage"
              label={"All"}
              defaultChecked
              onClick={() => setStorage("")}
              color="red"
            />
          </div>
        </div>
        <div className="w-full my-7">
          <Typography className="" placeholder={""} variant="h5">
            Operating System
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Radio
              crossOrigin=""
              name="os"
              label={"iOS"}
              onClick={() => setOs("iOS")}
              color="red"
            />
            <Radio
              crossOrigin=""
              name="os"
              label={"Android"}
              onClick={() => setOs("Android")}
              color="red"
            />
            <Radio
              crossOrigin=""
              name="os"
              defaultChecked
              label={"All"}
              onClick={() => setOs("")}
              color="red"
            />
          </div>
        </div>
        <div className="w-full my-7">
          <Typography className="" placeholder={""} variant="h5">
            Sort by
          </Typography>
          <Radio
            crossOrigin={""}
            name="sort"
            color="green"
            label={"ASCENDING"}
            onChange={() =>
              setCreatedAt((prev) => (prev === "DESC" ? "ASC" : "DESC"))
            }
          />
          <Radio
            crossOrigin={""}
            name="sort"
            color="green"
            label={"DESENDING"}
            onChange={() =>
              setCreatedAt((prev) => (prev === "DESC" ? "ASC" : "DESC"))
            }
          />
        </div>
        <div className="w-full">
          <input
            type="range"
            min={0}
            max={2000000}
            value={maxRange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMaxRange(Math.round(parseInt(e.target.value)))
            }
            className="range w-full h-6 rounded-lg accent-red-500"
          />
          <p>Price range 0 to {maxRange}</p>
        </div>
      </div>
      {allProducts?.data && <Table allProducts={allProducts?.data} />}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allProducts?.data.map((product: IProduct) => (
          <SingleCard product={product} key={product?._id} />
        ))}
      </div> */}
    </div>
  );
};

export default Products;
