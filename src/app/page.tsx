import Image from "next/image";
import Banner from "../components/ui/Banner"
import Card from "../components/ui/CardBase";
import Button from "../components/ui/Button";


export default function Home() {
  return (
    <div>
      <Banner />
      <section className="relative container mx-auto p-4 flex flex-col gap-8">
        <img
          src="/Gradient2.svg"
          alt="Gradient1"
          className="absolute -top-10 left-0 z-0 w-fit h-auto opacity-50 blur-sm invert dark:invert-0"
        />
        <Card />
        <span className="w-[4px] h-48 rounded-full bg-foreground block mx-auto z-10">
        </span>
        <div className="text-center flex flex-col justify-center items-center z-10">
          <p>
            Let's get started. start reservation now!
          </p>
          <Button variant="primary" className="mt-4" size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
