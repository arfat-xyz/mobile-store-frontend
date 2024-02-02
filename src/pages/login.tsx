import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useLoginMutation } from "../redux/module/user/userApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/module/user/userSlice";
type Inputs = {
  email: string;
  password: string;
};
export function Login() {
  const dispatch = useAppDispatch();
  const [login, { isLoading, isSuccess, error, data: loginData }] =
    useLoginMutation();
  const { email } = useAppSelector((state) => state?.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  if (error) {
    if ("data" in error) {
      toast.error(error?.data?.message as string);
    }
  }

  useEffect(() => {
    if (isSuccess && loginData?.data?.token) {
      toast.success("User register successfull. Please login");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: loginData?.data?.name + "asdfa",
          email: loginData?.data?.email,
          image: loginData?.data?.image,
          token: loginData?.data?.token,
        })
      );
      dispatch(setUser(loginData?.data));
      reset();
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [isSuccess, loginData?.data?.token]);
  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, [email]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    login({
      email,
      password,
    });
  };
  if (isLoading) {
    return <Loader />;
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
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody placeholder={""} className="flex flex-col gap-4">
            <Input
              crossOrigin={""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              label="Email"
              name="email"
              size="lg"
            />{" "}
            {errors.email && (
              <p className="text-red-800" role="alert">
                {errors.email.message}
              </p>
            )}
            <Input
              {...register("password", { required: "Password is required." })}
              crossOrigin={""}
              label="Password"
              name="password"
              type="password"
              size="lg"
            />{" "}
            {errors.password && (
              <p className="text-red-800" role="alert">
                {errors.password.message}
              </p>
            )}
          </CardBody>
          <CardFooter placeholder={""} className="pt-0">
            <Button type="submit" placeholder={""} variant="gradient" fullWidth>
              Sign In
            </Button>
            <Typography
              placeholder={""}
              variant="small"
              className="mt-6 flex justify-center"
            >
              Don&apos;t have an account?
              <Link to={"/signup"}>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
