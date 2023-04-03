import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Result } from "../models/placeDetails";
import Navbar from "./Navbar";
import { fetchDetails } from "../services/ApiServices";
import "../css/ItineraryCardDetails.css"

export function ItineraryCardDetails () {
    const {id} = useParams<{id:string}>();
  
    const [detailsRoute, setDetailsRoute] = useState<Result | null>(null);
  
    useEffect(() => {
      async function getPlaceDetails() {
        const response = await fetchDetails(id ?? "");
        setDetailsRoute(response)
      
      }
      getPlaceDetails();
    }, [id]);
  
    return (
        <div>
            <Navbar />            
      <div className="CardDetails">
        {detailsRoute !==null ? (
          <Row>
            <Col>
                  <Card>
                  {detailsRoute.photos && (
                    <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${detailsRoute.photos[0].photo_reference}&key=AIzaSyADw6kne2LUqaF8G-njq1U66rgpNkOgM7c`}
                      style={{ height: "300px", width: "50vw" }}
                    alt="Place"
                    />
                  )}
                  <CardBody>
                    <CardTitle tag="h2">{detailsRoute.name}</CardTitle>
                    </CardBody>
                    <div className="details-container">
                        <p><b>Address: </b>{detailsRoute.formatted_address}</p>
                      <p><b>Phone Number: </b>{detailsRoute.formatted_phone_number} </p>
                      <p><b>Hours: </b>{detailsRoute.opening_hours?.weekday_text.map((text: string) =>
                      <p>{text}</p>)}</p>
                      <p><b>Rating: </b>{detailsRoute.rating}</p>
                      <p><b>Type: </b>{detailsRoute.types[0].replace(/_/g, " ")}</p>
                      <p><b>Website: </b><a href={detailsRoute.website} target="_blank" rel="noopener noreferrer">
                            {detailsRoute.website}</a></p>
                    </div>
                </Card>
                </Col>
                </Row>
        ):(
          <h1>Loading...</h1>
        )
        }
      </div>
    </div>
    );
  }