export default async function dataFetch(
  url: string,
  formData: any,
  token: string | undefined,
  method: string
) {
  if (!token) {
    throw new Error("Unauthorized, please login.");
  }
  try {
    const options: any = {
      method: method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      referrerPolicy: "no-referrer",
    };

    // For GET requests, no need to include formData in the request body
    if (method !== "GET") {
      options.body = JSON.stringify(formData);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(
          (error: { msg: string }) => error.msg
        );
        const formattedErrorMessage = errorMessages.join(", ");
        throw new Error(`${response.status}: ${formattedErrorMessage}`);
      } else {
        throw new Error(`${response.status}: ${data.message}`);
      }
    }

    return data;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Sorry, we're experiencing technical difficulties. Please try again later."
      );
    } else {
      throw error;
    }
  }
}
