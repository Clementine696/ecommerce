import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions";
import { useLocation } from "react-router-dom";
import './style.css'
import { generatePublicUrl } from "../../urlConfig";

function ProductListPage(props) {

  const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product);

  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under25k: 25000,
    under30k: 30000,
  });

  const location = useLocation(); 
  const slug = location.pathname.split("/")[1];
  useEffect(() => {
    // console.log(slug);
    // console.log(form.defaultProps); //TODO:
    // const { match } = props;
    // dispatch(getProductsBySlug(match.params.slug));
    dispatch(getProductsBySlug(slug)); 
  }, []);
  // console.log("HOW")
  // Object.keys(product.productsByPrice).map((key, index) => {
  //   product.productsByPrice[key].map(product => 
  //     console.log(generatePublicUrl(product.productPictures[0].img))
  //   )
  // })

  // product && product.productPictures ? test.img : "https://www.example.com/example.png"

  return (
  <Layout>
    {
      Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{slug} under {priceRange[key]}</div>
              <button>view all</button>
            </div>
            <div style={{ display: 'flex' }} >
              {
                product.productsByPrice[key].map(product => 
                  <div className="productContainer">
                    <div className="productImgContainer">
                      <img src={product && product.productPictures.length > 0 ? generatePublicUrl(product.productPictures[0].img) : "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"} alt=""/>
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: '5px 0' }}>{product.name}</div>
                      <div>
                        <span>4.3</span>&nbsp;
                        <span>3533</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </div>
                  )
              }

              
            </div>
          </div>
        );
      })
    }
  </Layout>)
}

ProductListPage.propTypes = {};

export default ProductListPage;
