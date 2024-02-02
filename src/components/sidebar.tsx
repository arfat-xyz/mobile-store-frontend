import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { AddNewProduct } from "./addNewProduct";

export function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Card
      placeholder={""}
      className="md:h-[calc(100vh-2rem)] w-full md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
    >
      <div className="mb-2 p-4">
        <Typography placeholder={""} variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List placeholder={""} className="grid grid-cols-2 md:grid-cols-1">
        <Link to="/">
          <ListItem placeholder={""}>
            <ListItemPrefix placeholder={""}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/products">
          <ListItem placeholder={""}>
            <ListItemPrefix placeholder={""}>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Products
          </ListItem>
        </Link>
        {/* <ListItem placeholder={""}>
          <ListItemPrefix placeholder={""}>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <AddNewProduct />
        </ListItem> */}
        <AddNewProduct />

        <Link to={"/"}>
          <ListItem placeholder={""} onClick={handleLogout}>
            <ListItemPrefix placeholder={""}>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
