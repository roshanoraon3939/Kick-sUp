import CustomCard from "../CustomCard";
// import ProductDetail from "../ProductDetail/ProductDetail";
import '../Product/style.css';

const Product = ({ basket, product, addProduct, RemoveItemFromBasket }) => (
  <CustomCard
    basket={basket}
    product={product}
    addProduct={addProduct}
    RemoveItemFromBasket={RemoveItemFromBasket}
  />
);

export default Product;