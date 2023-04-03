import React, {useContext, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";

import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import {Context} from "../index";
import {createOrder} from "../http/orderApi";




const OrderPage = () => {

    const{basket, user} = useContext(Context)

    const KEY = process.env.REACT_APP_STRIPE

    const Mytd = styled.td`
      vertical-align: middle; 
      text-align: center;
      font-size: 18px;
    `
    const Myth = styled.th`
      vertical-align: middle; 
      text-align: center;
      font-size: 24px;
    `
    //ордер це кортежі з айді продукту і його кількості
    //відмалюємо кортежі
    /*useEffect(() => {
        const order =  fetchOrder(id).then(data => {

        })
    })*/

    //є айді продукта дістаємо картинку та імя

    const cart= {total:0}

    const [stripeToken, setStripeToken] = useState('')
    const onToken = (token) => {
    setStripeToken(token)
        console.log(stripeToken)
    };

    const onOrderApprove = (billingAddress) => {

        console.log("APPROVE")

        createOrder({
            user: user.user._id,
            products: basket.basket.products,
            address: billingAddress,
            status: "pending"
        }).then(data => console.log(data))

    }

    let amount = 0
    return (
      <Container>
          <h2 style={{textAlign:"center", marginTop:30}}>YOUR ORDER</h2>
        <Table striped bordered hover size="sm" className={"mt-5"}>
            <thead>
            <tr>
                <Myth></Myth>
                <Myth style={{width:"10rem", height: "5rem"}}>Image</Myth>
                <Myth>Name</Myth>
                <Myth>Amount</Myth>
                <Myth>Price</Myth>
                <Myth>Description</Myth>
            </tr>
            </thead>
            <tbody>

            {



                basket.products.map  (
                    prod  =>

                            <tr key={prod._id}>
                                <Mytd> {basket.products.indexOf(prod) + 1}</Mytd>
                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                    <img src={process.env.REACT_APP_API_URL + prod.img} alt={"mini-image"}
                                         style={{width: "100%", height: "100%"}}
                                    ></img>
                                </Mytd>
                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {prod.title} </Mytd>
                                <Mytd> {amount = (basket.basket.products.find(({product}) => product === prod._id)).amount} </Mytd>
                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>  {-cart.total + (cart.total += prod.price * amount)}</Mytd>

                                <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>  {prod.description}</Mytd>

                            </tr>

                )
            }
                </tbody>

        </Table>

          <StripeCheckout

              name="Best Shop"
              image={require( "../static/himars.jpg" )}
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total}`}
              amount={cart.total * 100}
              stripeKey={KEY}
              token={onToken}
          >
          <Button

              style={{
              display:"block", float:"left", marginTop:  10, fontSize: 24,
                background: "#F59B56", border:"none"
          }}

           size={"lg"} onClick={() => onOrderApprove({street: "Shevchenka", house_num: 40} )} >Підтвердити замовлення</Button>
          </StripeCheckout>
      </Container>
    );




};

export default OrderPage;