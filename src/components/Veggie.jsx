import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";


const Wrapper = styled.div`
margin: 4rem 0rem;
;`

const Card = styled.div`
min-height: 25rem;
border-radius: 2rem;
overflow: hidden;
position: relative;

img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate (-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
};
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%
    height: 100%;
    background: linera-gradient (rgba(0,0,0,0), rgba(0,0,0,0.5));
`;


const Veggie = () =>
{

    // const TEST_API_URL = 'https://api.npoint.io/2fea28b538c1462665a0';
    const API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_APP_API_KEY}&number=9`;
    const [veggie_recipes, setVeggieRecipes] = useState([]);

    useEffect( () => {
        const handleRetrieveRecipes = async () => 
        {
            const cached_veggie_recipes = localStorage.getItem('cached_veggie_recipes');
    
            // If cache exists, use that in component state
            if(cached_veggie_recipes) return setVeggieRecipes(JSON.parse(cached_veggie_recipes)?.recipes ?? []);
    
            console.log('fetching recipes from API')
    
            // initiates fetch request to Recipe API
            return await fetch(API_URL)
                .then(
                    // Resolve the returned promise into usable JSON
                    (res) => res.json()
                ).then(
                    // Once the data is resolved, take that value and inject it into component state
                    (response_data) => {
                        console.log(response_data)
                        const recipes = response_data.recipes ?? [];
                        console.log(recipes);
                        setVeggieRecipes(recipes);
                        localStorage.setItem('cached_veggie_recipes', JSON.stringify({recipes, cache_time: new Date()}));
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
        }

        if (!veggie_recipes.length > 0) handleRetrieveRecipes()

    }, []);

    return (
        <div>
            <Wrapper>
                <h3>Veggie Picks</h3>
                <Splide
                    options = {{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "5rem",
                    }}>
                    {veggie_recipes?.map((recipe) => (
                        <SplideSlide key = {recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                {/* <Gradient/> */}
                            {/* </Card> */}
                            </Card>
                        </SplideSlide>
                ))};
                </Splide>
            </Wrapper>
        </div>
    );
};


export default Veggie;