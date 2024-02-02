import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../redux/module/user/userApi";
import Loader from "../components/loader";
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
};

export function SignUp() {
  const [updatePost, { isLoading, isSuccess, error, data: userData }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  if (error) {
    if ("data" in error) {
      const err = error?.data?.errorMessages
        ? error?.data?.errorMessages[0]?.message
        : error?.data?.message;
      toast.error(err as string);
      reset();
      navigate("/signup");
      // toast.error(error?.data?.errorsMessages[0]?.message);
    }
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { confirmPassword, email, name, password, image } = data;
    if (confirmPassword === password) {
      updatePost({
        name,
        email,
        password,
        image,
      });
    } else {
      toast.error("Password didn't match");
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    toast.success("User register successfull. Please login");
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { email, name, image, token } = userData?.data;
    localStorage.setItem("user", JSON.stringify({ name, email, image, token }));
    reset();
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card placeholder={""} className="w-96">
        <CardHeader
          placeholder={""}
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography placeholder={""} variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody placeholder={""} className="flex flex-col gap-4">
            <Input
              {...register("name", { required: "Name is required." })}
              crossOrigin={""}
              label="Full Name"
              name="name"
              size="lg"
            />
            {errors.name && (
              <p className="text-red-800" role="alert">
                {errors.name.message}
              </p>
            )}
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              crossOrigin={""}
              label="Email"
              name="email"
              size="lg"
            />
            {errors.email && (
              <p className="text-red-800" role="alert">
                {errors.email.message}
              </p>
            )}
            <Input
              {...register("image", { required: "Image URL is required." })}
              crossOrigin={""}
              label="Image URL"
              type="text"
              name="image"
              size="lg"
            />
            {errors.image && (
              <p className="text-red-800" role="alert">
                {errors.image.message}
              </p>
            )}
            <Input
              {...register("password", { required: "Password is required." })}
              crossOrigin={""}
              label="Password"
              type="password"
              name="password"
              size="lg"
            />
            {errors.password && (
              <p className="text-red-800" role="alert">
                {errors.password.message}
              </p>
            )}
            <Input
              {...register("confirmPassword", {
                required: "Confirm Password is required.",
              })}
              crossOrigin={""}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              size="lg"
            />
            {errors.confirmPassword && (
              <p className="text-red-800" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </CardBody>
          <CardFooter placeholder={""} className="pt-0">
            <Button type="submit" placeholder={""} variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography
              placeholder={""}
              variant="small"
              className="mt-6 flex justify-center"
            >
              Already Sign up?
              <Link to={"/login"}>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign In
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
