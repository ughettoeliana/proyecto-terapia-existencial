//import accountSchema from "../schemas/account.js";
import tokenSchema from "../schemas/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../schemas/user.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

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
  console.log("accountData", accountData);
  return { ...account, password: undefined };
}

async function createToken(payload) {
  try {
    const accountData = await userSchema.findOne({ email: payload.email });
    const userId = accountData._id.toString();
    payload = {
      ...payload,
      userId,
    };
    const token = jwt.sign(payload, "CLAVE SECRETA");

    await tokenSchema.create({
      token,
      email: payload.email,
      userId: payload.userId,
    });
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

//Forgot Password functions

async function forgotPassword({ email }) {
  try {
    const oldUser = await userSchema.findOne({ email: email });
    if (!oldUser) {
      return "User does not exist";
    }
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      "CLAVE SECRETA",
      {
        expiresIn: "10m",
      }
    );

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "elianaughetto10@gmail.com",
        pass: "ztkj o dyu sj xm hgn l ",
      },
    });

    var mailOptions = {
      from: "elianaughetto10@gmail.com",
      to: `${oldUser.email}`,
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${oldUser._id}/${token}`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject({ msg: "Error sending email", error });
        } else {
          resolve("Success");
        }
      });
    });

  } catch (error) {
    console.log("error", error);
    throw ({ msg: "Error sending email", error });

  }
}

async function resetPassword(req) {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
   const objectId = new mongoose.Types.ObjectId(id);

    jwt.verify(token, "CLAVE SECRETA", (err, decoded) => {
      if (err) {
        throw ({ msg: "Error with token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            userSchema.findByIdAndUpdate({ _id: objectId }, { password: hash })
              .then((u) => {return "Success"})
              .catch((err) =>  {throw { msg: err }});
          })
          .catch((err) => {throw { msg: err }});
      }
    });
  } catch (error) {
    throw { msg: "Error in resetPassword:", error };
  }
}


// async function createNewPassword(req, res) {
//   try {
//     const { id, token } = req.params;
//     const { password } = req.body;

//     const objectId = new mongoose.Types.ObjectId(id);

//     const oldUser = await userSchema.findOne({ _id: objectId });
//     console.log("oldUser", oldUser);

//     if (!oldUser) {
//       return console.log("User does not exist");
//     }

//     const secret = "CLAVE SECRETA" + oldUser.password;

//     try {
//       const verify = jwt.verify(token, secret);
//       const encriptedPassword = await bcrypt.hash(password, 10);
//       await userSchema.updateOne(
//         { _id: objectId },
//         {
//           $set: {
//             password: encriptedPassword,
//           },
//         }
//       );

//       res.status(200).json({ msg: "Password updated" });
//       console.log("Verified", verify);
//     } catch (error) {
//       console.log("Not verified", error); // Log the actual error
//       res.status(500).json({ msg: "Something went wrong" });
//     }
//   } catch (error) {
//     throw error; // Log the actual error
//   }
// }

// async function forgotPassword({ email }) {
//   try {
//     const oldUser = await userSchema.findOne({ email: email });
//     if (!oldUser) {
//       return "User does not exist";
//     }
//     const secret = "CLAVE SECRETA" + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: "5m",
//     });

//     const link = `http://localhost:3000/api/reset-password/${oldUser._id}/${token}`;
//     console.log("link", link);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// async function resetPassword(req, res) {
//   try {
//     const { id, token } = req.params;
//     const objectId = new mongoose.Types.ObjectId(id);

//     const oldUser = await userSchema.findOne({ _id: objectId });
//     if (!oldUser) {
//       throw { msg: "User does not exist" };
//     }
//     const secret = "CLAVE SECRETA" + oldUser.password;
//     try {
//       const verify = jwt.verify(token, secret);
//       console.log("the return", {token: token, id: verify.id});
//       return {token: token, id: verify._id}

//     } catch (error) {
//       throw { msg: "Not verified", error };
//     }
//   } catch (error) {
//     throw { msg: "Error in resetPassword:", error };
//   }
// }

// async function createNewPassword(req, res) {
//   try {
//     const { id, token } = req.params;
//     const { password } = req.body;

//     const objectId = new mongoose.Types.ObjectId(id);

//     const oldUser = await userSchema.findOne({ _id: objectId });
//     console.log("oldUser", oldUser);

//     if (!oldUser) {
//       return console.log("User does not exist");
//     }

//     const secret = "CLAVE SECRETA" + oldUser.password;

//     try {
//       const verify = jwt.verify(token, secret);
//       const encriptedPassword = await bcrypt.hash(password, 10);
//       await userSchema.updateOne(
//         { _id: objectId },
//         {
//           $set: {
//             password: encriptedPassword,
//           },
//         }
//       );

//       res.status(200).json({ msg: "Password updated" });
//       console.log("Verified", verify);
//     } catch (error) {
//       console.log("Not verified", error); // Log the actual error
//       res.status(500).json({ msg: "Something went wrong" });
//     }
//   } catch (error) {
//     throw error; // Log the actual error
//   }
// }

export default {
  createAccount,
  createSession,
  deleteSession,
  verifyToken,
  forgotPassword,
  resetPassword,
  //createNewPassword,
};
