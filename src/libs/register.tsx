export default async function userRegister(name: string, email: string, password: string) {
    const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
  
    return await response.json();
  }
  