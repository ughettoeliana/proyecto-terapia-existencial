const apiUrl = "http://localhost:3000/api";

export const getComments = async (serviceId) => {
  try {
    const response = await fetch(`${apiUrl}/feedbacks/${serviceId}`, {
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



export const submitComment = async (commentData) => {
  try {
    const response = await fetch(`${apiUrl}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in API:", error);
    throw error;
  }
};