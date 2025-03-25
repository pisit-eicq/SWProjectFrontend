import { ReservationJson } from "../../interface";

export default async function updateReservation(token: string,apptDate:string,reservationId:string): Promise<ReservationJson> {
    return await fetch(
      `https://sw-project-backend-one.vercel.app/api/v1/reservations/${reservationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({
            apptDate:apptDate
          })
      }
    )
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }