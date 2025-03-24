export default async function getVenues(): Promise<VenueJson> {
    // Delay 300ms
    await new Promise(resolve => setTimeout(resolve, 300));

    const response = await fetch('https://sw-project-backend-one.vercel.app/api/v1/restaurants');
    if (!response.ok) {
        throw new Error('Failed to fetch venues');
    }

    return response.json();
}