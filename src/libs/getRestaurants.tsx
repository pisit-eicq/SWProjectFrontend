import { RestaurantJson } from "../../interface";

export default async function getRestaurants(): Promise<RestaurantJson> {

    const response = await fetch('https://sw-project-backend-one.vercel.app/api/v1/restaurants');
    if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
    }

    return response.json();
}
