import { ReservationJson } from "../../interface";

export default async function deleteReservation(token: string,reservationId:string): Promise<ReservationJson> {
    return await fetch(
      `https://sw-project-backend-one.vercel.app/api/v1/reservations/${reservationId}`,
      {
        method: "DELETE",
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