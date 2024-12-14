import { useContext, useState } from "react";
import { ShopContext } from "../ShopContext/ShopContext";
import "./ProductList.css";
import { IoMdCloseCircle } from "react-icons/io";
const ProductList = () => {
  const { products, addTocart } = useContext(ShopContext);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleModal = (product = null) => {
    setModal(!modal);
    setSelectedProduct(product);
  };
  return (
    <div>
      <div className="product-list">
        <h2>Our Bag Collection</h2>
        <div className="product-grid">
          {products.map((product) => {
            const { id, image, price, title } = product;
            return (
              <div className="product-card" key={id}>
                <img
                  className="product-image"
                  src={image}
                  alt=""
                  onClick={() => toggleModal(product)}
                />
                <div className="product-info">
                  <h4>{title}</h4>
                  <p>$ {price}</p>
                </div>
                <button className="add-to-cart" onClick={() => addTocart(product, id)}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {modal && setSelectedProduct && (
        <div className="product_modal">
          <div className="product_modal-content">
            <IoMdCloseCircle className="modal_close" onClick={toggleModal} />
            <div className="modal_content">
              <img className="modal_img" src={selectedProduct.image} alt="" />
              <h3 className="modal_title">{selectedProduct.title}</h3>
              <h2 className="modal_price">{selectedProduct.price}</h2>
              <button className="buy_now">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;
