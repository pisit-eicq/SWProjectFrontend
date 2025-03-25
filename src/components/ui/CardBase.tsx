import "@/components/ui/style/cardbase.css";
import getRestaurants from "@/libs/getRestaurants";
import { RestaurantItem } from "interface";

export default async function Card() {
    const restaurant=await getRestaurants();
    return (
        <div className="card w-full min-h-96 bg-background/75 hover:bg-background border shadow-lg rounded-lg relative border-base-300">
            <div className="p-8 z-10 relative">
                <h3 className="text-foreground text-4xl font-semibold font-dela uppercase">
                    Featured Resturants
                </h3>
                <hr className="border-t-2 border-dashed border-foreground my-4" />
                {
                    restaurant.data.map((restaurantItem:RestaurantItem)=>(
                    <div className="grid grid-cols-2 gap-4 pt-4 card-container" key={restaurantItem._id}>
                        <span className="text-4xl font-extrabold text-foreground">
                            {restaurantItem.name}
                        </span>
                        <div>
                            <h4 className="text-foreground text-2xl font-semibold font-dela">
                                {restaurantItem.name}
                            </h4>
                            <p className="text-foreground text-lg font-semibold mt-2">
                            {`${restaurantItem.address} | ${restaurantItem.tel} | ${restaurantItem.office_hours.open} - ${restaurantItem.office_hours.close} ${restaurantItem.office_hours.tz}`}
                            </p>
                        </div>
                    </div>))
                }
            </div>
        </div>
    );
}
