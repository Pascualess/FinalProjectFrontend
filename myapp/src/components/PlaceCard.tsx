import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Result } from '../models/nearbySearch';


export interface IPlaceCardProps {
    card: Result;
}

// export function PlaceCard (props: IPlaceCardProps) {
//     let { card } = props;

//     const [isItinerary, setItinerary] = React.useState<Boolean>(false);
//     const { addPlace } = useContext(PlaceContext);

//     const { removePlace, places } = useContext{PlaceContext};
//     useEffect(() => {
//         if (places.find((place:Result) => place.place_id === card.place_id)) {
//             setItinerary(true);
//         }
//     },[])

//     console.log(places);

//     let button;
//     if (isItinerary){
//         button= <Button className="add-button" style={{padding: 2}} onClick={() => {
//             removePlace(card.place_id);
//             setItinerary(false);
//             }}>
//         <i className="fa-sharp fa-regular fa-circle-plus"></i>
//     </Button>;
//     } else {
//         button= <Button className="add-button" style={{padding: 2}} onClick={() => {
//             addPlace(card);
//             setItinerary(true);
//             }}>
//         <i className="fa-sharp fa-solid fa-circle-plus"></i>
//     </Button>;
//     }

//     return (
//         <div className="PlaceCard">

//             <div>
//                <img className= "image" src= {card.photos[0].photo_reference} alt="Event image" style={{height: "200px", width: "300px"}}/>
//             </div>
//             <div>
//               {card.name}
//             </div>
//             <Button className="details" href={"/placedetails/"+ card.place_id}>Details</Button>
//             {button}
//         </div>
//     )
// }

// export default PlaceCard;
