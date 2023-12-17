const apiUrl = "http://localhost:3000/api";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error in API login function:", error);
  }
};

export const createAccount = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Account creation failed");
    }
  } catch (error) {
    console.error("Error in API createAccount function:", error);
  }
};

export const logout = async (authToken) => {
  try {
    const response = await fetch(`${apiUrl}/session`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to log out: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in API logout function:", error);
  }
};

export const getUserById = async (userId, authToken) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Get user by id failed");
    }
  } catch (error) {
    console.error("Error in API getUserById function:", error);
  }
};

export const updateUser = async (editedUser, userId) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      console.log("updatedUserData", updatedUserData);
      return updatedUserData;
    } else {
      console.error("Update user by id failed");
      console.error("result", response);
    }
  } catch (error) {
    console.error("Error in API getUserById function:", error);
  }
};
