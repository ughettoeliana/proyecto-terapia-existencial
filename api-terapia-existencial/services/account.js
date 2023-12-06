//import accountSchema from "../schemas/account.js";
import tokenSchema from "../schemas/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../schemas/user.js";

async function createAccount(account) {
  try {

    const newAccount = new userSchema(account);
    newAccount.password = await bcrypt.hash(
      account.password,
      await bcrypt.genSalt(10)
    );

    await newAccount.save();
  } catch (error) {
    console.log(error);
  }
}

async function verifyAccount(account) {
  const accountData = await userSchema.findOne({ email: account.email });

  if (!accountData) {
    throw { msg: "No se encuentra el email en la base de datos" };
  }

  if (!(await bcrypt.compare(account.password, accountData.password))) {
    throw { msg: "El password es incorrecto" };
  }
  console.log('accountData', accountData)
  return { ...account, password: undefined };
}

async function createToken(payload) {
  try {
    const accountData = await userSchema.findOne({ email: payload.email });
    const userId = accountData._id.toString();
    payload = {
      ...payload,
      userId
    }
    const token = jwt.sign(payload, "CLAVE SECRETA");

    await tokenSchema.create({ token, email: payload.email, userId: payload.userId});
    return token;
  } catch (error) {
    console.log("error", error);
  }
}

async function createSession(account) {
  console.log("account", account);

  return {
    account: await verifyAccount(account),
    token: await createToken({ ...account, password: undefined }),
  };
}

async function verifyToken(token) {
  const payload = jwt.verify(token, "CLAVE SECRETA");

  if (!(await tokenSchema.findOne({ token }))) {
    throw { msg: "El token no esta en la base de datos" };
  }

  return payload;
}

async function deleteSession(token) {
  await tokenSchema.deleteOne({ token });
}

export default {
  createAccount,
  createSession,
  deleteSession,
  verifyToken,
};
