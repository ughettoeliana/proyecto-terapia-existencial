const apiUrl = "http://localhost:3000/api";

export const createAppointment = async (userId, serviceId, appointmentData) => {
  try {
    const response = await fetch(`${apiUrl}/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        serviceId,
        appointmentData,
      }),
    });
    console.log(
      JSON.stringify({
        userId,
        serviceId,
        appointmentData: {
          date: appointmentData.date,
          time: appointmentData.time,
        },
      })
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Appointment creation failed");
    }
  } catch (error) {
    console.error("Error in API createAppointment function:", error);
  }
};



export const getAppointmentByUserId = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/appointments/${userId}`, {
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

  export const deleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`${apiUrl}/appointment/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete appointment with ID ${appointmentId}`);
      }
    } catch (error) {
      console.error("Error during appointment deletion:", error);
    }
  };
  
  