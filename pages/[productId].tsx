import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Product } from "../interfaces";

interface Props {
  product: Product;
}

const ProductComp: NextPage<Props> = ({ product }) => {
  return (
    <div>
      {product && (
        <Head>
          <title>
            {product.name} @ {product.price}
          </title>
          <meta
            name="description"
            content={`Get ${product.name} at a very low price of ${product.price}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <div>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
      </div>
    </div>
  );
};

export default ProductComp;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(
    `https://us-central1-medstore-eaba8.cloudfunctions.net/app/products/${
      params!.productId
    }`
  );
  const { product }: Props = await response.json();
  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
};
