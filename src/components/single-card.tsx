import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { IProduct } from "../types/productTypes";
import { Link } from "react-router-dom";

export function SingleCard({ product }: { product: IProduct }) {
  return (
    <Card placeholder={""} className="mt-6 w-full">
      <CardHeader placeholder={""} color="blue-gray" className="relative h-56">
        <img src={product.image} alt="card-image" className="h-auto w-fit" />
      </CardHeader>
      <CardBody placeholder={""}>
        <Typography
          placeholder={""}
          variant="h5"
          color="blue-gray"
          className="mb-2"
        >
          {product.productName}
        </Typography>
        <Typography placeholder={""}>
          {product?.description?.length > 30
            ? product?.description.slice(0, 30) + "..."
            : product?.description}
        </Typography>
        <div className="flex justify-between items-center">
          <p>
            <strong>Price: </strong> {product?.price}
          </p>
          <p
            className={`px-4 py-2 rounded-lg text-white ${
              product?.quantity > 0 ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <strong>Stock: </strong>{" "}
            {product.quantity > 0 ? "In stock" : "Out of Stock"}
          </p>
        </div>
      </CardBody>
      <CardFooter placeholder={""} className="pt-0">
        <Link to={`/product/${product?._id}`}>
          <Button placeholder={""}>Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
