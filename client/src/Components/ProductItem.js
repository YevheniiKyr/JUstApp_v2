import React, { useEffect} from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {useNavigate} from "react-router-dom";

import {observer} from "mobx-react-lite";

const ProductItem = observer(({product}) => {


        const navigate = useNavigate()


        useEffect(() => {

        }, [])

        return (
            <Col lg={3} md={4}  sm={6}   >

              {/*  <Container>
                <Card style={{width: '15vw', height: '35vh',cursor: "pointer", marginTop:"3vh"}}>
                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}
                              style={{width: '12vw', height: '15vh', alignSelf: "center", marginTop:"1vh"}}/>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-center" }  style={{fontSize:'3vh'}}> {product.title}</Card.Title>
                        <Card.Text className = {"d-flex justify-content-center"} style={{fontSize:'2vh'}}>
                            {product.description}
                        </Card.Text>





                        <Button
                            style={{width: '6vw', height:'5vh',  fontSize:'2vh', justifyContent:"center" }}
                            className = {"d-flex m-auto "}
                            onClick={() => {
                            navigate(PRODUCT_ROUTE + '/' + product._id)
                            console.log(PRODUCT_ROUTE + '/' + product._id)
                        }

                        } variant="outline-primary">detail</Button>




                    </Card.Body>
                </Card>
                </Container>*/


                  <Container >
                      <Card style={{width: '15rem',height:'25rem', cursor: "pointer", marginTop:"3rem"}}>
                          <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}
                                    style={{width: '12rem', height: '15vh', alignSelf: "center", marginTop:"1rem"}}/>
                          <Card.Body>
                              <Card.Title className={"d-flex justify-content-center" }  style={{fontSize:'2.5rem'}}> {product.title}</Card.Title>
                              <Card.Text className = {"d-flex justify-content-center"} style={{fontSize:'1.5rem'}}>
                                  {product.description}
                              </Card.Text>





                              <Button
                                  style={{width: '6rem', height:'3rem',  fontSize:'2rem', justifyContent:"center", verticalAlign: "center" }}
                                  className = {"d-flex m-auto "}
                                  onClick={() => {
                                      navigate(PRODUCT_ROUTE + '/' + product._id)
                                      console.log(PRODUCT_ROUTE + '/' + product._id)
                                  }

                                  } variant="outline-primary">detail</Button>




                          </Card.Body>
                      </Card>
                  </Container>


              }
            </Col>
        );
    }
)

export default ProductItem;