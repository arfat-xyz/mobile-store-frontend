import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { useAppSelector } from "../redux/hooks";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/module/product/productApi";
import Loader from "./loader";
type Inputs = {
  productName: string;
  image: string;
  price: number;
  selectBrand: { value: string; label: string };
  brand: string;
  description: string;
  quantity: number;
  model: string;
  selectOs: { value: string; label: string };
  os: string;
  selectStorage: { value: string; label: string };
  storage?: string;
  size: string;
  camera: string;
  battery: string;
  status?: boolean;
  keyFeatures?: string[] | string;
};
type IProps = {
  id: string;
};
export const UpdateOrAdd = ({ id }: IProps) => {
  const [open, setOpen] = useState(false);
  const { token } = useAppSelector((state) => state.user);
  const {
    data,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
  } = useGetSingleProductQuery(
    {
      id,
      token,
    },
    {
      pollingInterval: import.meta.env.VITE_POLLING,
    }
  );
  const handleOpen = () => setOpen(!open);
  const [addProduct, { isLoading, isSuccess }] = useAddProductMutation();
  const [
    updateProduct,
    { isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  useEffect(() => {
    if (getIsSuccess) {
      setValue("productName", data?.data?.productName);
      setValue("battery", data?.data?.battery.slice(0, -3));
      setValue("brand", data?.data?.brand);
      setValue("camera", data?.data?.camera.slice(0, -2));
      setValue("description", data?.data?.description);
      setValue("image", data?.data?.image);
      setValue("model", data?.data?.model);
      setValue("os", data?.data?.os);
      setValue("price", data?.data?.price);
      setValue("quantity", data?.data?.quantity);
      setValue("size", data?.data?.size);
      setValue("status", data?.data?.status);
      setValue("storage", data?.data?.storage);
      console.log(data?.data?.keyFeatures[0]);
      setValue("keyFeatures", data?.data?.keyFeatures[0]);
    }
  }, [getIsSuccess]);
  useEffect(() => {
    if (updateSuccess || isSuccess) {
      reset();
      toast.success("Successfull");
      handleOpen();
    }
  }, [updateSuccess, isSuccess]);
  useEffect(() => {
    if (isLoading || getIsLoading || updateLoading) <Loader />;
  }, [isLoading, getIsLoading, updateLoading]);
  useEffect(() => {
    if (isSuccess) setOpen(!open);
  }, [isSuccess]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { selectStorage, selectBrand, selectOs, ...other } = data;
    other.brand = selectBrand?.value ? selectBrand?.value : other.brand;
    other.storage = selectStorage?.value ? selectStorage?.value : other.storage;
    other.os = selectOs?.value ? selectOs?.value : other.os;
    other.camera = other.camera + "MP";
    // other.size = other.size + "inches";
    other.battery = other.battery + "MAh";
    other.price = parseInt(other.price as unknown as string);
    other.status = true;
    other.keyFeatures = [];
    other.keyFeatures.push(data.keyFeatures as string);
    addProduct({ data: other, token });
    // setOpen(!open);
  };
  const onUpdate: SubmitHandler<Inputs> = (data) => {
    const { selectStorage, selectBrand, selectOs, ...other } = data;
    other.brand = selectBrand?.value ? selectBrand?.value : other.brand;
    other.storage = selectStorage?.value ? selectStorage?.value : other.storage;
    other.os = selectOs?.value ? selectOs?.value : other.os;
    other.camera = other.camera + "MP";
    // other.size = other.size + "inches";
    other.battery = other.battery + "MAh";
    other.price = parseInt(other.price as unknown as string);
    other.status = true;
    other.keyFeatures = [];
    other.keyFeatures.push(data.keyFeatures as string);
    updateProduct({ data: other, id, token });
  };

  return (
    <>
      {/* <Button placeholder={""} onClick={handleOpen}>
        Open Dialog
      </Button> */}
      {/* 
      <ListItem onClick={handleOpen} placeholder={""}>
        <ListItemPrefix placeholder={""}>
          <ShoppingBagIcon className="h-5 w-5" />
        </ListItemPrefix>
        Add new product
      </ListItem> */}
      <Button
        placeholder={""}
        onClick={handleOpen}
        color="deep-orange"
        variant="outlined"
      >
        Update or Add
      </Button>
      <Dialog placeholder={""} className="" open={open} handler={() => {}}>
        <DialogHeader placeholder={""} className="flex justify-center">
          Add new product
        </DialogHeader>
        <DialogBody
          placeholder={""}
          className="flex justify-center items-center"
        >
          <Card
            placeholder={""}
            color="transparent"
            className="w-full h-[80vh] overflow-y-scroll px-6"
            shadow={false}
          >
            <form className="mt-8 mb-2  sm:w-full">
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Product name
                </Typography>
                <Input
                  crossOrigin={""}
                  size="lg"
                  placeholder="Arfatur Rahman"
                  type="text"
                  {...register("productName", {
                    required: "Product Name is required",
                  })}
                  defaultValue={data?.productName}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.productName && (
                  <p className="text-red-500">{errors.productName.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Image URL
                </Typography>
                <Input
                  crossOrigin={""}
                  size="lg"
                  placeholder="https://"
                  type="text"
                  {...register("image", {
                    required: "Image URL is required",
                  })}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Price
                </Typography>
                <Input
                  crossOrigin={""}
                  {...register("price", {
                    required: "Price is required",
                  })}
                  type="number"
                  size="lg"
                  placeholder="12345"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
                {/* <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Brand name
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  placeholder="Mac"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("brand", {
                    required: "Brand name is required",
                  })}
                />
                {errors.brand && (
                  <p className="text-red-500">{errors.brand.message}</p>
                )} */}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Brand name
                </Typography>
                <Controller
                  name="selectBrand"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={{ value: "IPhone", label: "IPhone" }}
                      options={[
                        { value: "IPhone", label: "IPhone" },
                        { value: "Samsung", label: "Samsung" },
                        { value: "Xiaomi", label: "Xiaomi" },
                      ]}
                    />
                  )}
                />
                {errors.selectBrand && (
                  <p className="text-red-500">{errors.selectBrand.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Description
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("description", {
                    required: "Description name is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Quantity
                </Typography>
                <Input
                  crossOrigin={""}
                  type="number"
                  size="lg"
                  min={0}
                  placeholder="12345"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("quantity", {
                    required: "Quantity name is required",
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Model
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("model", {
                    required: "Model name is required",
                  })}
                />
                {errors.model && (
                  <p className="text-red-500">{errors.model.message}</p>
                )}{" "}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Camera
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("camera", {
                    required: "Model name is required",
                  })}
                />
                {errors.camera && (
                  <p className="text-red-500">{errors.camera.message}</p>
                )}
                {/* <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Operating System
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("os", {
                    required: "Operating System name is required",
                  })}
                />
                {errors.os && (
                  <p className="text-red-500">{errors.os.message}</p>
                )} */}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Operating System
                </Typography>
                <Controller
                  name="selectOs"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={{ value: "iOS", label: "iOS" }}
                      options={[
                        { value: "iOS", label: "iOS" },
                        { value: "Android", label: "Android" },
                      ]}
                    />
                  )}
                />
                {errors.selectOs && (
                  <p className="text-red-500">{errors.selectOs.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Storage
                </Typography>
                {/* <SelectForm {...register("storage")} /> */}
                <Controller
                  name="selectStorage"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={{ value: "64 GB", label: "64 GB" }}
                      options={[
                        { value: "64 GB", label: "64 GB" },
                        { value: "128 GB", label: "128 GB" },
                        { value: "512 GB", label: "512 GB" },
                        { value: "1024 GB", label: "1024 GB" },
                      ]}
                    />
                  )}
                />
                {errors.selectStorage && (
                  <p className="text-red-500">{errors.selectStorage.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Size
                </Typography>
                <Input
                  crossOrigin={""}
                  type="number"
                  step={"0.1"}
                  min={5}
                  max={9}
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("size", {
                    required: "Size is required",
                  })}
                />{" "}
                {errors.size && (
                  <p className="text-red-500">{errors.size.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Battery
                </Typography>
                <Input
                  crossOrigin={""}
                  type="number"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("battery", {
                    required: "Battery is required",
                  })}
                />{" "}
                {errors.battery && (
                  <p className="text-red-500">{errors.battery.message}</p>
                )}
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3"
                >
                  Key Feature
                </Typography>
                <Input
                  crossOrigin={""}
                  type="text"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("keyFeatures", {
                    required: "Key Features is required",
                  })}
                />{" "}
                {errors.keyFeatures && (
                  <p className="text-red-500">{errors.keyFeatures.message}</p>
                )}
              </div>

              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="blue"
                className="mt-6"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </Button>
              <Button
                type="submit"
                placeholder={""}
                variant="gradient"
                color="blue"
                className="mt-6"
                fullWidth
                onClick={handleSubmit(onUpdate)}
              >
                Update
              </Button>
            </form>
          </Card>
        </DialogBody>
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
};
