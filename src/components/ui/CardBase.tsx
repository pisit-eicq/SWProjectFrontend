import "@/components/ui/style/cardbase.css";
import getRestaurants from "@/libs/getRestaurants";
import { RestaurantItem } from "interface";

export default async function Card() {

    const restaurantJson=await getRestaurants();

    return (
        <div className="card w-full min-h-96 bg-background/75 hover:bg-background border shadow-lg rounded-lg relative border-base-300">
            <div className="p-8 z-10 relative">
                <h3 className="text-foreground text-4xl font-semibold font-dela uppercase">
                    Featured Resturants
                </h3>
                <hr className="border-t-2 border-dashed border-foreground my-4" />
                {
                    restaurantJson.data.map((restaurant:RestaurantItem)=>(
                        <div className="grid grid-cols-2 gap-4 pt-4 card-container" key={restaurant._id}>
                            <span className="text-4xl font-extrabold text-foreground">
                                {restaurant.name}
                            </span>
                            <div>
                                <h4 className="text-foreground text-2xl font-semibold font-dela">
                                    {restaurant.name}
                                </h4>
                                <p className="text-foreground text-lg font-semibold mt-2">
                                    Address {restaurant.address} |   Tel. {restaurant.tel} | Open-Close {restaurant.office_hours.open} - {restaurant.office_hours.close} {restaurant.office_hours.tz}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
