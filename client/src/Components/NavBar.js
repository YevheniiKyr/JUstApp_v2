import React, {useContext} from 'react';
import styled from "styled-components";
import {Button, Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import UserStore from "../store/userStore";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constRoutes";



const NavBar = observer(() => {
    const {user, basket} = useContext(Context)
    const navigate = useNavigate()

    const logout  = () => {


        navigate(LOGIN_ROUTE)
        user.setUser({})
        user.setIsAuth(false)


    }
    return (

        <Navbar bg="light" variant="dark">
            <Container>
                <Button
                    onClick=
                        {() => {
                            navigate(SHOP_ROUTE)

                        }}
                    variant={"light"} >SHOP</Button>


                {user.isAuth ?
                    <Nav className="ml-auto ">
                        <Button
                            style={{ marginRight: 15 }}
                            onClick=
                                {() => {
                                    console.log("BASKET ID " + basket.basket._id)
                                    navigate(BASKET_ROUTE + '/' + basket.basket._id)
                                }

                        }

                            variant={"outline-dark"}> Кошик </Button>

                        <Button
                            onClick={() => navigate(ADMIN_ROUTE)}
                            style={{ marginRight: 5 }}
                            variant={"outline-dark"}
                           >
                            Адмін панель
                        </Button>
                        <Button
                            onClick={ logout }

                            variant={"outline-dark"}
                            > Вийти </Button>


                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            onClick={() => navigate(LOGIN_ROUTE)}
                            variant={"outline-dark"}
                            > Увійти </Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
})

export default NavBar;