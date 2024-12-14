import "./Navbar.css";
import { IoBagAddOutline } from "react-icons/io5";
import { ShopContext } from "../ShopContext/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { itemAmount } = useContext(ShopContext);
  return (
    <div>
      <div className="navbar">
        <div className="logo">YBL Bags</div>
        <div className="links">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>
        <Link to="/cart">
          <div className="nav_icon_wrapper">
            <IoBagAddOutline className="nav_icon" />
            <p className="nav_cart_qty">{itemAmount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
