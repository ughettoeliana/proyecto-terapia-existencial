import userSchema from "../schemas/user.js";
import accountService from "../services/account.js";

function createAccount(req, res) {
  accountService
    .createAccount(req.body)
    .then(() => {
      res.status(201).json({ msg: "Cuenta creada con exito!" });
    })
    .catch(() => {
      res.status(500).json({ msg: "Falló al crear la cuenta" });
    });
}

function login(req, res) {
  accountService
    .createSession(req.body)
    .then((session) => {
      res.status(200).json(session);
    })
    .catch(() => {
      res.status(500).json({ msg: "Falló el inicio de session" });
    });
}

function logout(req, res) {
  accountService
    .deleteSession(req.token)
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(500).json({ msg: "Falló al cerrar la session", err });
    });
}

function forgotPassword(req, res) {
  accountService
    .forgotPassword(req.body)
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Falló al encontrar los datos del usuario",
        err,
      });
    });
}

async function resetPassword(req, res) {
  accountService
    .resetPassword(req)
    .then(() => {
      res.status(200).json({msg: "success"});
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Falló al intentar cambiar la contraseña", err });
    });
}

// async function createNewPassword(req, res) {
//   accountService
//     .createNewPassword(req, res)
//     .then(() => {
//       res.status(200).json({});
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ msg: "Falló al intentar cambiar la contraseña", err });
//     });
// }

export default {
  createAccount,
  login,
  logout,
  forgotPassword,
  resetPassword,
  //createNewPassword,
};
