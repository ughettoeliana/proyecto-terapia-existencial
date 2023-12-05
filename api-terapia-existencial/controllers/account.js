import accountService from '../services/account.js'

function createAccount(req, res) {
  accountService.createAccount(req.body)
    .then(() => {
      res.status(201).json({ msg: "Cuenta creada con exito!" })
    })
    .catch(() => {
      res.status(500).json({ msg: "Falló al crear la cuenta" })
    })
}


function login(req, res) {
  accountService.createSession(req.body)
    .then((session) => {
      res.status(200).json(session)
    })
    .catch(() => {
      res.status(500).json({ msg: "Falló el inicio de session" })
    })
}

function logout(req, res) {
  accountService.deleteSession(req.token)
    .then(() => {
      res.status(200).json({})
    })
    .catch((err) => {
      res.status(500).json({ msg: "Falló al cerrar la session", err })
    })
}

export default {
  createAccount,
  login,
  logout
}