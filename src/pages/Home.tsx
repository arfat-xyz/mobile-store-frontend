import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { SellTable } from "../components/SellTable";
import { LineChart } from "../components/charts";
import Loader from "../components/loader";
import { useAppSelector } from "../redux/hooks";
import { useGetDataQuery } from "../redux/module/sell/sellApi";

const Home = () => {
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetDataQuery(
    { token },
    { pollingInterval: import.meta.env.VITE_POLLING }
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
    <div>
      <Typography className="my-7" placeholder={""} variant="h2">
        Sell table
      </Typography>
      <SellTable />{" "}
      <Typography className="my-7" placeholder={""} variant="h2">
        Daily sales
      </Typography>
      {data?.data && <LineChart data={data?.data?.day} value="Day" />}
      <Typography className="my-7" placeholder={""} variant="h2">
        Weekly sales
      </Typography>
      {data?.data && <LineChart data={data?.data?.week} value="Week" />}
      <Typography className="my-7" placeholder={""} variant="h2">
        Monthly sales
      </Typography>
      {data?.data && <LineChart data={data?.data?.month} value="Month" />}
      <Typography className="my-7" placeholder={""} variant="h2">
        Yearly sales
      </Typography>
      {data?.data && <LineChart data={data?.data?.year} value="Year" />}
    </div>
  );
};

export default Home;
