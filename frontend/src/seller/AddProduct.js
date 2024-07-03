import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import api from '../api.js';


const AddProduct = () => {
  
  const vendor_id=localStorage.getItem('vendor_id');
   
  const [category,setCategory]=useState([]); 
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");


  useEffect(()=>{
    api.get('/api/category/')
    .then((res)=>{
      setCategory(res.data.results)
      console.log(res.data.results)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  const [ProductData, setProductData] = useState({
    category: "",
    vendor: vendor_id,
    title: "",
    detail: "",
    price: "",
    image: "",
    // slug: "",
    // tags: "",
    // demo_url: "",
    // product_file: "",
  });

  const inputHandler=(e)=>{
    setProductData({
      ...ProductData,
      [e.target.name]:e.target.value,
    })
  };

  const fileHandler=(e)=>{
    setProductData({
      ...ProductData,
      [e.target.name]:e.target.files[0],
    })
  };

  // console.log(ProductData)


  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("category", ProductData.category);
    formData.append("vendor", ProductData.vendor);
    formData.append("title", ProductData.title);
    formData.append("detail", ProductData.detail);
    formData.append("price", ProductData.price);
    formData.append("image", ProductData.image);
    // formData.append("tags", ProductData.tags);
    // formData.append("demo_url", ProductData.demo_url);
    // formData.append("product_file", ProductData.product_file);



    api
      .post("/api/product/", formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      .then(function (res) {
        console.log(res);
        if (res.data.bool==false) {
          // setFormError(true);
          seterrorMsg(res.data.msg);
          setsuccessMsg('');
        }
        else {
          setProductData({
            category: "",
            vendor: vendor_id,
            title: "",
            detail: "",
            price: "",
            image: "",
            // slug: "",
            // tags: "",
            // demo_url: "",
            // product_file: "",
          });
          console.log(res.data);
          // setFormError(false);
          seterrorMsg('');
          setsuccessMsg(res.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <div className="main_profile_component">
        <div className="profile_component">
          <h1>Add Product</h1>
          {successMsg && <p className="success_text">{successMsg}</p>}
          {errorMsg && <p className="error_text">{errorMsg}</p>}
          <label for="p-title">Title:</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="enter title:"
            value={ProductData.title}
            id="p-title"
            onChange={inputHandler}
            className="title"
          />
          <br />
          <label for="detail">Detail:</label>
          <br />
          <textarea
            name="detail"
            placeholder="enter detail:"
            value={ProductData.detail}
            id="detail"
            onChange={inputHandler}
            className="detail"
          ></textarea>
          <br />
          {/* <label for="slug">slug:</label>
          <br />
          <input
            type="text"
            name="slug"
            placeholder="enter slug:"
            value={ProductData.slug}
            id="slug"
            onChange={inputHandler}
            className="slug"
          /> */}
          <br />
          <label for="price">Price:</label>
          <br />
          <input
            type="number"
            name="price"
            placeholder="enter price:"
            value={ProductData.price}
            id="price"
            onChange={inputHandler}
            className="price"
          />
          <br />
        
          <label for="category">Category:</label>   
          <br />
          <select name="category" onChange={inputHandler}>
          <option value="" >-----------</option>
          {
          category.map((cate,index)=><option value={cate.id} key={index}>{cate.title}</option>)
          }
          
            {/* <option value={"kitchen"}>kitchen</option>
            <option value={"sport"}>sport</option>
            <option value={"electronic"}>electronic</option>
            <option value={"toys"}>toys</option> */}
          </select>
          <br />
          {/* <label for="tags">Tags:</label>
          <br />
          <textarea
            name="tags"
            placeholder="enter tags:"
            value={ProductData.tags}
            id="tags"
            onChange={inputHandler}
            className="tags"
          ></textarea>
          <br />
          <label for="demo_url">demo_url:</label>
          <br />
          <input
            type="url"
            name="demo_url"
            placeholder="enter demo_url:"
            value={ProductData.demo_url}
            id="demo_url"
            onChange={inputHandler}
            className="demo_url"
          /> */}
          <br />
          <label for="image">Image:</label>
          <br />
          <input type="file" name="image" onChange={fileHandler} id="image" className="image" />
          <br />
          <br />
          {/* <label for="product_file">Product File:</label>
          <br />
          <input type="file" name="product_file" onChange={fileHandler} id="product_file" className="product_file" />
          <br /> */}
          <button className="submit_btn" onClick={submitHandler} type="button">Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
