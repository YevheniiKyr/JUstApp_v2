import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constRoutes";
import {login, registration} from "../http/authApi";
import {fetchBasket} from "../http/cartApi";


const Auth = observer(() => {

    const navigate = useNavigate()
    const location = useLocation()
    const isRegistration = location.pathname === REGISTRATION_ROUTE
    const {user, basket} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')


    const signUp = async () => {

        try {
            const response = await registration(email, password)
            console.log("REGISTRATED")
            user.setUser(response)
            user.setIsAuth(true)
            fetchBasket(response._id).then(data => {
                basket.setBasket(data)
                basket.setProducts(data.products)
                console.log(data)
            })
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    const signIn = async () => {
        // try {
        //     console.log("SIGN IN")
        //     login(email, password).then(user_data => {
        //         console.log("here")
        //     user.setUser(user_data)
        //     user.setIsAuth(true)
        //     console.log("USER ID " + user_data._id)
        //         console.log("USER ROLE " + user_data.role )
        //         console.log("USER email " + user_data.email)
        //     fetchBasket(user_data._id).then(data => {
        //         basket.setBasket(data)
        //         basket.setProducts(data.products)
        //         console.log("BASKET" + data._id)
        //         console.log("BASKET" + data.products)
        //
        //     })
        //     navigate(SHOP_ROUTE)
        //         console.log("no error")
        //
        //     })
        // }catch (e) {
        //     console.log("error")
        //     alert("Неправильне ім'я чи пароль")
        // }
        try {
            console.log("SIGN IN")
            const user_data = await login(email, password);
            console.log("here")
            user.setUser(user_data)
            user.setIsAuth(true)
            console.log("USER ID " + user_data._id)
            console.log("USER ROLE " + user_data.role)
            console.log("USER email " + user_data.email)
            const data = await fetchBasket(user_data._id);
            basket.setBasket(data)
            basket.setProducts(data.products)
            console.log("BASKET" + data._id)
            console.log("BASKET" + data.products)
            navigate(SHOP_ROUTE)
            console.log("no error")
        } catch (e) {
            console.log("error")
            alert("Неправильне ім'я чи пароль")
        }


    }

    return (
        <
            Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 60}}

        >
            <Card style={{width: 600, border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}} className="p-5">
                <h2 className="m-auto">{isRegistration ?
                    "Реєстрація" : 'Авторизація'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />


                    {/*<Container>*/}
                    {/*    {isRegistration ?*/}

                    {/*        <input*/}
                    {/*            type="date"*/}
                    {/*            className="mt-3"*/}
                    {/*            placeholder="Введіть дату народження..."*/}
                    {/*            value={birthdate}*/}
                    {/*            onChange={e => {*/}
                    {/*                setBirthdate(e.target.value)*/}
                    {/*                console.log(birthdate)*/}
                    {/*            }}*/}


                    {/*        ></input>*/}
                    {/*        :*/}
                    {/*        <></>*/}
                    {/*    }*/}
                    {/*</Container>*/}


                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isRegistration ?

                            <div>
                                <Link to={LOGIN_ROUTE}>Увійти</Link>
                            </div>
                            :
                            <div>
                                <Link to={REGISTRATION_ROUTE}>Зареєструватися</Link>
                            </div>
                        }
                        <Button
                            className={"mt-2 btn-success"}

                            onClick={isRegistration ? signUp : signIn}
                        >
                            {isRegistration ? "Реєстрація" : 'Авторизація'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>


    );

})


export default Auth;