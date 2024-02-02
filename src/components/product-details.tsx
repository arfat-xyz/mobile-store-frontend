import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useGetSingleProductCommentQuery,
  useGetSingleProductQuery,
} from "../redux/module/product/productApi";
import toast from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import Loader from "./loader";
import { useEffect } from "react";
import SingleComment from "./singleComment";
import { IComment } from "../types/productTypes";
import { Button, Typography } from "@material-tailwind/react";

const ProductDetails = () => {
  const { id } = useParams<string>();
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleProductQuery({ id, token });
  const { data: productComment, isLoading: commentLoading } =
    useGetSingleProductCommentQuery(
      { id, token },
      {
        pollingInterval: import.meta.env.VITE_POLLING,
      }
    );
  const [addComment, { isLoading: addLoading }] = useAddCommentMutation();
  useEffect(() => {
    if (isLoading || commentLoading || addLoading) <Loader />;
  }, [isLoading, commentLoading, addLoading]);
  if (!isLoading && !data?.data?.productName) {
    toast.error("No product found");
    navigate("/products");
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.target as HTMLFormElement).comment?.value;
    addComment({ product: data?.data?._id, token, comment: value });
  };
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-fit h-full mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={data?.data?.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {data?.data?.brand}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data?.data?.productName}
            </h1>

            <p className="leading-relaxed">{data?.data?.description}</p>

            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">
                {data?.data?.price}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Button
              </button>
            </div>
          </div>
        </div>
        <div>
          <Typography className="my-7" placeholder={""} variant="h2">
            Comment section
          </Typography>
          {productComment?.data?.map((c: IComment) => (
            <SingleComment key={c?._id} comment={c} />
          ))}
          <form
            onSubmit={handleSubmit}
            className="mx-auto my-8 flex flex-col max-w-screen-sm"
          >
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                name="comment"
              ></textarea>
            </div>
            <Button
              type="submit"
              placeholder={""}
              variant="gradient"
              color="blue"
              className="mt-6"
            >
              Post comment
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
