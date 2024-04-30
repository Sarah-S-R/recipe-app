import { useEffect, useState } from "react";

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        const apiKey = process.env.REACT_APP_API_KEY || '9a0c4351054043918751db84eba68ed0';
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`);
        const data = await api.json();
        setPopular(data.recipes);
    };
    

    return (
        <div>
            <>Popular</>
            {popular.map((recipe) => {
                return (
                    <div key={recipe.id}> {/* Added key prop */}
                        <p>{recipe.title}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Popular;
