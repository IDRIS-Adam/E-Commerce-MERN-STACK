import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const resgister = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  // checking if the user is found in my DB
  const findUser = await userModel.findOne({ email: email });

  //Checking the unew user
  if (findUser) {
    return { data: "User already exists !", statusCode: 400 };
  }

  // Hashed Password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Replace my password with password hashed
  const neweUser = new userModel({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await neweUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUSer = await userModel.findOne({ email });

  // if the user does no find in my DB , return data and status
  if (!findUSer) {
    return { data: "Incorrect Email or Passwor", statusCode: 400 };
  }

  // Crypt the entered password and match it by password crypted in the DB
  const passwordMatch = await bcrypt.compare(password, findUSer.password);

  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUSer.firstName,
        lastName: findUSer.lastName,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect Email or Password", statusCode: 400 };
};

const generateJWT = (data: any) => {

  // use .env file for secret my importants variables 
  return jwt.sign(data, process.env.JWT_SECRET || "" );
};
