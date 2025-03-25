import { ReservationJson } from "../../interface";

export default async function addReservation(token: string,apptDate:string,restaurantId:string): Promise<ReservationJson> {
    return await fetch(
      `https://sw-project-backend-one.vercel.app/api/v1/${restaurantId}/reservations`,
      {
        method: "POST",
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