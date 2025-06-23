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
          "https://hf-store.pk/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-04-at-5.23.01-AM-700x535.jpeg",
        price: 700,
        stock: 10,
      },
      {
        title: "Asus Laptop",
        image:
          "https://winblogs.thesourcemediaassets.com/sites/2/2017/05/2d32bf94499761cf00b4642162deb8bf-e1496038264499.jpg",
        price: 650,
        stock: 10,
      },
      {
        title: "HP Laptop",
        image:
          "https://www.hp.com/fr-fr/shop/Html/Merch/Images/9Q249EA-ABF_1750x1285.jpg",
        price: 900,
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
