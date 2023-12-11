const apiUrl = "http://localhost:3000/api";

export const getServices = async () => {
  try {
    const response = await fetch(`${apiUrl}/services`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else if (response.status === 401) {
      return response.status;
    }


    // if (!response.ok) {
    //   throw new Error(
    //     `Failed to fetch data: ${response.status} ${response.statusText}`
    //   );
    // }

    // const data = await response.json();
    // return data.data;
  } catch (error) {
    console.error("Error in API fetchServices function:", error);
    throw error;
  }
};

export const createNewService = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error in API createNewService function:", error);
  }
};

export const editService = async (serviceId, formData) => {
  try {
    const response = await fetch(`${apiUrl}/service/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error in API editService function:", error);
  }
};

export const getServiceDetails = async (serviceId) => {
  try {
    const response = await fetch(`${apiUrl}/service/${serviceId}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in API getServiceDetails function:", error);
    return null;
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await fetch(`${apiUrl}/service/${serviceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete service with ID ${serviceId}`);
    }
  } catch (error) {
    console.error("Error during service deletion:", error);
  }
};

