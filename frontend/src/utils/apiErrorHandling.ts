export default function apiErrorHandling(error: any) {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return new Error(
      "Sorry, we're experiencing technical difficulties. Please try again later."
    );
  } else {
    return error;
  }
}
