import "@/components/ui/style/cardbase.css";
import getRestaurants from "@/libs/getRestaurants";
import { RestaurantItem } from "interface";

export default function Card() {

    return (
        <div className="card w-full min-h-96 bg-background/75 hover:bg-background border shadow-lg rounded-lg relative border-base-300">
            <div className="p-8 z-10 relative">
                <h3 className="text-foreground text-4xl font-semibold font-dela uppercase">
                    Featured Resturants
                </h3>
                <hr className="border-t-2 border-dashed border-foreground my-4" />
                {
                    <div className="grid grid-cols-2 gap-4 pt-4 card-container">
                    <span className="text-4xl font-extrabold text-foreground">
                        test1
                    </span>
                    <div>
                        <h4 className="text-foreground text-2xl font-semibold font-dela">
                            test1
                        </h4>
                        <p className="text-foreground text-lg font-semibold mt-2">
                            des1
                        </p>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}
