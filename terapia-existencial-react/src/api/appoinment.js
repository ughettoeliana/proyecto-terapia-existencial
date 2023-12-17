const apiUrl = "http://localhost:3000/api";

export const createAppoinment = async (userId, serviceId, appoinmentData) => {
  try {
    const response = await fetch(`${apiUrl}/appoinment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        serviceId,
        appoinmentData,
      }),
    });
    console.log(
      JSON.stringify({
        userId,
        serviceId,
        appoinmentData: {
          date: appoinmentData.date,
          time: appoinmentData.time,
        },
      })
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Appoinment creation failed");
    }
  } catch (error) {
    console.error("Error in API createAppoinment function:", error);
  }
};



export const getAppoinmentByUserId = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/appoinments/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error("Error fetching comments");
        return null;
      }
    } catch (error) {
      console.error("Error in API fetchComments function:", error);
      return null;
    }
  };
  
  