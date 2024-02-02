import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import { useGetSingleProductQuery } from "../redux/module/product/productApi";
import { usePostSellMutation } from "../redux/module/sell/sellApi";
import Loader from "./loader";
type IProps = {
  id: string;
};
type Inputs = {
  quantity: number;
};
export function ShowSellingModal({ id }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetSingleProductQuery(
    { id, token },
    {
      pollingInterval: import.meta.env.VITE_POLLING,
    }
  );
  const [
    postSell,
    { isLoading: postLoding, isSuccess: postSuccess, error: postError },
  ] = usePostSellMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    if (postSuccess) {
      toast.success("Product sold");
      setOpen(!open);
    }
  }, [postSuccess]);
  if (isLoading && postLoding) {
    return <Loader />;
  }
  if (postError) {
    // toast.error(postError)
    console.log(postError, "this is post error");
  }

  const onSubmit: SubmitHandler<Inputs> = (allValues) => {
    postSell({ token, productId: id, quantity: allValues?.quantity });
  };
  return (
    <>
      <Button
        placeholder={""}
        onClick={handleOpen}
        color="red"
        variant="outlined"
      >
        Sell
      </Button>
      <Dialog
        placeholder={""}
        open={open}
        handler={() => {}}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader placeholder={""}>
          {" "}
          {data?.data?.productName}{" "}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody placeholder={""} className="flex flex-col gap-4">
            <p>
              <strong>Avaliable quantity: </strong> {data?.data?.quantity}
            </p>
            <Input
              crossOrigin={""}
              type="number"
              {...register("quantity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: `Value must be greater than or equal to 1`,
                },
                max: {
                  value: data?.data?.quantity,
                  message: `Value must be less than or equal to ${data?.data?.quantity}`,
                },
              })}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
            <Button
              placeholder={""}
              variant="outlined"
              type="submit"
              color="green"
              className="float-right w-40 ml-auto"
            >
              Sell
            </Button>
          </DialogBody>
        </form>
        <DialogFooter placeholder={""}>
          <Button
            placeholder={""}
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
