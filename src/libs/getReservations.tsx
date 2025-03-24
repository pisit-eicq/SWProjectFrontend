import { ReservationsJson } from "../../interface";

export default async function getReservations(token: string): Promise<ReservationsJson> {
    return await fetch(
      "https://sw-project-backend-one.vercel.app/api/v1/reservations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }