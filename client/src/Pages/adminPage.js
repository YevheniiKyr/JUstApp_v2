import React, {useState} from 'react';

import {Button, Container} from "react-bootstrap";
import AddCategory from "../Components/modals/AddCategory";
import AddProduct from "../Components/modals/AddProduct";
import {useNavigate} from "react-router-dom";
import {SHOW_ORDERS_ROUTE} from "../utils/constRoutes";

const AdminPage = () => {

    const[categoryVisible, setCategoryVisible] = useState(false)
    const[productVisible, setProductVisible] = useState(false)
    const navigate = useNavigate()


    return (
        <Container className={"d-flex flex-column"}>
            <Button className = "mt-3" onClick={()=>setCategoryVisible(true)}> Додати категорію</Button>
            <Button className = "mt-3" onClick={()=>setProductVisible(true)}>  Додати товар </Button>
            <AddCategory show = {categoryVisible}
                         onHide ={()=>setCategoryVisible(false)}
            />
            <AddProduct show = {productVisible}
                        onHide ={()=>setProductVisible(false)}
            />
            <Button className = "mt-3" onClick={()=>navigate(SHOW_ORDERS_ROUTE )}> Керувати замовленнями </Button>


        </Container>
    );
};

export default AdminPage;