import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image:
          "https://m.media-amazon.com/images/G/08/apparel/rcxgs/tile._CB483369919_.gif",
        price: 1500,
        stock: 10,
      },
    ];
    const productExist = await getAllProducts();

    if (productExist.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error("Cannot see DB", error);
  }
};
