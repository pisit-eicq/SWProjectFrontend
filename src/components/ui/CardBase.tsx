import "@/components/ui/style/cardbase.css";

export default function Card() {
    return (
        <div className="card w-full min-h-96 bg-black/75 hover:bg-black border shadow-lg rounded-lg relative border-zinc-800">
            <div className="p-8 z-10 relative">
                <h3 className="text-white text-4xl font-semibold font-dela uppercase">
                    Featured Resturants
                </h3>
                <hr className="border-t-2 border-dashed border-white my-4" />
                <div className="grid grid-cols-2 gap-4 pt-4 card-container">
                    <span className="text-4xl font-extrabold text-white">
                        SDelta
                    </span>
                    <div>
                        <h4 className="text-white text-2xl font-semibold font-dela">
                            SDelta
                        </h4>
                        <p className="text-white text-lg font-semibold mt-2">
                            SDelta is a resturant that serves delicious food
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 card-container">
                    <span className="text-4xl font-extrabold text-white">
                        A16
                    </span>
                    <div>
                        <h4 className="text-white text-2xl font-semibold font-dela">
                            A16
                        </h4>
                        <p className="text-white text-lg font-semibold mt-2">
                            A16 is a resturant that serves delicious food
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
