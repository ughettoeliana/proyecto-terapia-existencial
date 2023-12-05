
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
        return result
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
        return result
      } else {
        console.error("Account creation failed");
      }
    } catch (error) {
      console.error("Error in API createAccount function:", error);
    }
  };


export const logout = async (authToken) => {
  try {
    console.log('response', authToken)

    const response = await fetch(`${apiUrl}/session`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    console.log('response', response)
    if (!response.ok) {
      throw new Error(`Failed to log out: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in API logout function:", error);
  }
};

