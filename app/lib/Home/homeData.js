import HeroSection from "@/app/ui/Home/HeroSection";

const getHerosData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/home", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch hero data");
    }
    const data = await res.json();
    return data.heroes; // Return the array directly
  } catch (error) {
    console.error("Error fetching heros:", error);
  }
};

export default async function HeroData() {
  const heros = await getHerosData();
  return (
    <div>
      <HeroSection heros={heros} /> {/* Pass 'heros' array directly */}
    </div>
  );
}
