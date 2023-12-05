import userServices from "../services/user.js";

 const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const createdUser = await userServices.createUser(userData);
    res.status(201).json({ data: createdUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
  }
};

 const getUsers = async (req, res) => {
  try {
    const foundUsers = await userServices.getUsers();
    res.status(201).json({ data: foundUsers });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
  }
};

 const getUserById = async (req, res) => {
  try {
    const {id} = req.params
    const foundUser = await userServices.getUserById(id);
    res.status(201).json({ data: foundUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
  }
};

 const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const {email, password, user} = req.body
    const updateUser = await userServices.updateUser(id, {email, password, user});
    res.status(201).json({ data: updateUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
  }
};

 const deleteUser = async (req, res) => {
  try {
    const {id} = req.params
    const deleteUser = await userServices.deleteUser(id);
    res.status(201).json({ data: deleteUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el usuario', error: error.message });
  }
};

 export default { createUser, getUsers, getUserById, updateUser, deleteUser };
