import Head from "next/head";
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const AddProduct: NextPage = () => {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const addProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // don't redirect the page
    // check for impty fields and then make a post request
    if (!productName || !price) return;

    const res = await fetch(
      "https://us-central1-medstore-eaba8.cloudfunctions.net/app/products",
      {
        body: JSON.stringify({
          name: productName,
          price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <div>
      <Head>
        <title>Add new Product</title>
        <meta name="description" content="Form to add new product" />
      </Head>
      <form onSubmit={addProduct}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter the name of the product"
        />

        <br />
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          id="price"
          placeholder="999"
        />
        <br />
        <button disabled={loading ? true : false}>Create</button>
      </form>
    </div>
  );
};

export default AddProduct;
