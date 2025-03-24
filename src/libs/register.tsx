export default async function userRegister(name: string, email: string, password: string) {
  const response = await fetch("https://sw-project-backend-one.vercel.app/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "user"  // เพิ่ม role ให้เป็น "user"
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return await response.json();
}
