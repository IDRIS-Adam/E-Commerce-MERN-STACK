import { cartModel } from "../models/cartModel";
import { IOrderItems, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";
import { ExtendRequest } from "../Types/extendedRequest";

/////////////////////////////////////////////////////////// Create Cart for User
interface createCartForUser {
  userId: string;
}

const createCartForUSer = async ({ userId }: createCartForUser) => {
  try {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Failed to create cart");
  }
};

interface getActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: getActiveCartForUser) => {
  try {
    let cart;
    if (populateProduct) {
      cart = await cartModel
        .findOne({ userId, status: "active" })
        .populate("items.product");
    } else {
      cart = await cartModel.findOne({ userId, status: "active" });
    }
    if (!cart) {
      cart = await createCartForUSer({ userId });
    }
    return cart;
  } catch (error) {
    console.error("Error getting active cart:", error);
    throw new Error("Failed to get active cart!");
  }
};

////////////////////////////////////////////////////////////////////// ADDING
interface addItemToCart {
  productId: any;
  userId: string;
  quantity: number;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: addItemToCart) => {
  try {
    // Bring the active cart for user
    const cart = await getActiveCartForUser({ userId });

    // does the item exist in the cart ?

    if (!cart) {
      return { data: "No active cart founded", statusCode: 400 };
    }
    const existInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );

    //Check the product in cart.
    if (existInCart) {
      return { data: "Item already exist in cart", statusCode: 400 };
    }

    // Else fetch the product
    const product = await productModel.findById(productId);

    //Check the product
    if (!product) {
      return { data: "Product no found", statusCode: 400 };
    }

    // Check the stook
    if (product.stock < quantity) {
      return { data: "The stock is low for the item", statusCode: 400 };
    }

    //Else Push the product inside the array of cart
    cart.items.push({
      product: productId,
      unitPrice: product.price,
      quantity,
    });

    // Update the total Amount for the cart

    cart.totalAmount += product.price * quantity;

    await cart.save();
    return {
      data: await getActiveCartForUser({ userId, populateProduct: true }),
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { data: "Failed to add item to cart", statusCode: 500 };
  }
};

/////////////////////////////////////////////////////////////////////// UPDATING
interface updateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: updateItemInCart) => {
  try {
    // first get the active card
    const cart = await getActiveCartForUser({ userId });

    //second get the item in the card
    const existInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );

    //third check the existing item
    if (!existInCart) {
      return { data: "Item does not exist in cart", statusCode: 400 };
    }

    // find product from DB
    const product = await productModel.findById(productId);

    //chech the product
    if (!product) {
      return { data: "product not found", statusCode: 400 };
    }

    //chack stock
    if (product.stock < quantity) {
      return { data: "Low stock for item", statusCode: 400 };
    }

    // Calculate the total Amount for the cart unless the existing product
    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productId
    );
    console.log(otherCartItems);
    // calculate the items of cart by reduce in sum
    let total = otherCartItems.reduce((sum, product) => {
      sum += product.quantity * product.unitPrice;
      return sum;
    }, 0);

    existInCart.quantity = quantity;
    total += existInCart.quantity * existInCart.unitPrice;

    cart.totalAmount = total;

    // last step
    await cart.save();
    return {
      data: await getActiveCartForUser({ userId, populateProduct: true }),
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error updating item in cart:", error);
    return { data: "Failed to update cart", statusCode: 500 };
  }
};

///////////////////////////////////////////////////////////////////////////// DELETING

interface deleteItemFromCard {
  userId: string;
  productId: any;
}

export const deleteItemFromCard = async ({
  userId,
  productId,
}: deleteItemFromCard) => {
  try {
    // first get the active card
    const cart = await getActiveCartForUser({ userId });

    //second get the item in the card
    const existInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );

    //third check the existing item
    if (!existInCart) {
      return { data: "Item does not exist in cart", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productId
    );

    let total = otherCartItems.reduce((sum, product) => {
      sum += product.quantity * product.unitPrice;
      return sum;
    }, 0);

    cart.items = otherCartItems;
    cart.totalAmount = total;
    await cart.save();

    return {
      data: await getActiveCartForUser({ userId, populateProduct: true }),
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error for delete ", error);
    return { data: "Failed to delete !!", statusCode: 500 };
  }
};

///////////////////////////////////////////////////// DELETE ALL PRODUCT FROM CART (CLEAR)

interface clearCart {
  userId: string;
}

export const clearCart = async ({ userId }: clearCart) => {
  try {
    const cart = await getActiveCartForUser({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
  } catch (error) {
    console.error("Error to clear cart", error);
    return { data: "Failed to clear cart", statusCode: 500 };
  }
};

////////////////////////////////////// Finish the Porchase [ Checkout and Create an Order ]

interface Checkout {
  userId: string;
  address: string;
}

export const Checkout = async ({ userId, address }: Checkout) => {
  try {
    if (!address) {
      return { data: "Please Enter the address !!", statusCode: 400 };
    }

    const cart = await getActiveCartForUser({ userId });

    const orderItems: IOrderItems[] = [];
    // Loop cartItems and create orderItems

    for (const item of cart.items) {
      const product = await productModel.findById(item.product);
      // console.log(product)

      if (!product) {
        return { data: "Product not found", statusCode: 400 };
      }

      const Items: IOrderItems = {
        productTitle: product.title,
        productImage: product.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      };

      orderItems.push(Items);
      console.log(orderItems);
    }
    const Order = await orderModel.create({
      orderItems: orderItems,
      total: cart.totalAmount,
      address,
      userId,
    });

    // Update the cart status to be completed
    cart.status = "completed";
    await cart.save();
    return { data: Order, statusCode: 200 };
  } catch (error) {
    console.error("Error to checkout the cart", error);
    return { data: "Failed to checkout the cart", statusCode: 500 };
  }
};
