import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

const getCacheTime = (local_storage_key) =>
{
    const potential_cache_data = localStorage.getItem(local_storage_key);

    if (potential_cache_data) return JSON.parse(potential_cache_data)?.cache_time ?? undefined;

    return undefined
}

function Home () {

    // Check cache validity and clear Local Storage Cache to ensure fresh API data is fetched
    const isMoreThan24HoursOld = (timestamp) =>
    {
        // Convert the ISOString timestamp to a Date object
        const currentDate = new Date();
        const providedDate = new Date(timestamp);
        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - providedDate;
        // Convert milliseconds to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        // Check if the time difference is greater than 24 hours
        return hoursDifference > 24;
    }

    const veggie_recipe_cache_time = getCacheTime('cached_veggie_recipes')

    if(isMoreThan24HoursOld(veggie_recipe_cache_time)){
        console.log('clearing veggie recipe cache')
        localStorage.removeItem('cached_veggie_recipes')
    }

    return (
        <div>
            <Veggie/>
            <Popular/>
        </div>
   );
}

export default Home;
