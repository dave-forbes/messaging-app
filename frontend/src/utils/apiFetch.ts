export default async function apiFetch(
  url: string,
  formData: any,
  token: string | undefined,
  method: string,
  sendJSON: boolean
) {
  try {
    const options: any = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
    };

    if (sendJSON) {
      options.headers['Content-Type'] = 'application/json';
    }

    if (method !== 'GET') {
      if (sendJSON) {
        options.body = JSON.stringify(formData);
      } else {
        options.body = formData;
      }
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(
          (error: { msg: string }) => error.msg
        );
        const formattedErrorMessage = errorMessages.join(', ');
        throw new Error(
          `${response.status}: ${formattedErrorMessage}`
        );
      } else {
        throw new Error(`${response.status}: ${data.message}`);
      }
    }

    return data;
  } catch (error: any) {
    if (
      (error instanceof TypeError &&
        error.message === 'Failed to fetch') ||
      error instanceof SyntaxError
    ) {
      throw new Error(
        "Sorry, we're experiencing technical difficulties. Please try again later."
      );
    } else {
      throw error;
    }
  }
}
