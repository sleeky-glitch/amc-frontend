export async function POST(req: Request) {
  // Extract the query from the request body
  const { query } = await req.json();

  // Check if query is a string and not empty
  if (typeof query !== 'string' || query.trim() === '') {
    return new Response(JSON.stringify({ error: "Invalid input: query must be a non-empty string." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create the payload
  const payload = {
    query: query.trim(), // Trim whitespace from the query
  };

  try {
    // Make a request to the backend API
    const response = await fetch("https://combinedbotbackend.onrender.com/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text(); // Get the error response text
      console.error(`Error response from backend: ${errorText}`); // Log the error response
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the response from the backend API
    const data = await response.json();

    // Validate the response structure if necessary
    if (!data || typeof data !== 'object') {
      throw new Error("Invalid response format from backend");
    }

    // Return the response data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Error during fetch:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

