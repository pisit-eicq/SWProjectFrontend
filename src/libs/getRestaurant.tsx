import { RestaurantJson } from "../../interface";

export default async function getRestaurant(id: string): Promise<RestaurantJson> {

    const response = await fetch(`https://sw-project-backend-one.vercel.app/api/v1/restaurants/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch restaurant with id: ${id}`);
    }

    return response.json();
}
