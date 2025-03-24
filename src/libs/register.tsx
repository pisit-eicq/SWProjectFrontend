export default async function userRegister(username: string, email: string, password: string) {
  try {
    const response = await fetch("https://sw-project-backend-one.vercel.app/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role: "user" // ส่ง role: "user"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // รับข้อมูล error response
      throw new Error(errorData?.message || "Failed to register user"); // ใช้ข้อความจาก error response
    }

    return await response.json(); // ถ้าเรียกสำเร็จ
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during registration");
  }
}
