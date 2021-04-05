import React, { useEffect, useState } from 'react';
import { Container, DeleteUpdateButtons, P } from './style';
import axios from 'axios';
import { BsFillTrashFill, BsBrush, BsArrowRight } from "react-icons/bs";
import Modal from '../Modal';

const BlockchainContainer = ({
    activeName,
}) => {
    const [active, setActive] = useState({});
    // eslint-disable-next-line 
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line 

    const getDescription = () => {
        axios.post('http://ec2-54-173-117-139.compute-1.amazonaws.com/api/query/getSchema', {
                "assetType": "category"
        })
        .then((response) => {
            console.log(response.data.description);
        })
        .catch(function (error) {
            console.log(error.message);
        })
        .then(function () {
        });
    }

    const deleteActive = () => {
        axios.delete('http://ec2-54-173-117-139.compute-1.amazonaws.com/api/invoke/deleteAsset', {
            "@key" : {
                "@assetType": `${activeName}`
            }
        })
        .then((response) => {
            
        })
        .catch(function (error) {
        console.log(error.message);
        })
        .then(function () {
    });
    }
    
    const updateActive = () => {
        console.log('entrou');
    }

    return(
        <Container>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <P>
                <p style={{fontSize: '1.5rem'}}>{active.name}</p>
            </P>
            <button onClick={deleteActive} style={{ backgroundColor: 'white', border: 'none', borderRadius: '0.5rem'}}>
                <BsFillTrashFill style={{color: 'rgba(0, 0, 0, 0.8)', width: '20px', height:'20px'}}/>
            </button>
            </div>
            <DeleteUpdateButtons>
            <button onClick={updateActive}  style={{ backgroundColor: 'white', border: 'none', borderRadius: '0.5rem'}}>
                <BsBrush style={{color: 'rgba(0, 0, 0, 0.8)', width: '20px', height:'20px'}}/>
            </button>
            </DeleteUpdateButtons>
            <button onClick={getDescription} style={{ backgroundColor: 'white', border: 'none', borderRadius: '0.5rem', marginLeft: '80%', marginTop: '20%'}}>
            <BsArrowRight style={{color: 'rgba(0, 0, 0, 0.8)', width: '30px', height:'30px'}}/>
            </button>
        </Container>
    );
}

export default BlockchainContainer;