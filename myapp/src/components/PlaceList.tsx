import * as React from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { Result } from '../models/nearbySearch';
// import PlaceCard from './PlaceCard';
import { SearchForm } from './SearchForm';



export interface IAppProps {
}

export function App (props: IAppProps) {
  return (
    <div>
      
    </div>
  );
}

// export function PlaceList () {

//     const [place, setPlace] = React.useState<Result[]>([])

//     useEffect(() => {
//         getNearbySearch().then(data => setPlace(data));
//     }, []);
    
//     useEffect(() => {
//         console.log(place)
//     }, [place])

//     function filterPlaces(place:Result[]) {
//         setPlace(place);
//     }

//   return (
//     <div className="PlaceList">
//         <SearchForm PlaceList={filterPlaces}/>
//         <Row>
//            { place?
//            place.map((card, index) => (
//       <Col lg="4" key={index}>
//         <PlaceCard key={card.place_id} card={card} />
//       </Col>
//       )) || ""
//     : <Col tag="h1">No events found.</Col>
//     }
//         </Row>
//       </div>
//     );
//   }
// function getNearbySearch() {
//     throw new Error('Function not implemented.');
// }

