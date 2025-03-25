import Button from "./Button";

const Banner: React.FC = () => {
    return (
        <div className="relative p-4 w-screen h-screen">
            <img src="/Bg.svg" alt="Banner" className="object-cover w-full h-full opacity-50 absolute top-0 left-0 invert dark:invert-0" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-left">
                    <h1 className="text-6xl font-bold font-dela uppercase">Welcome to the Resturant Manager</h1>
                    <p className="text-lg">Manage your resturant with ease</p>
                    <a href="/me/booking"><Button variant="outline">Get Started</Button></a>
            </div>
        </div>
    );
};

export default Banner;