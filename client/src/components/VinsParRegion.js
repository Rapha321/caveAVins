import React, { useEffect, useState } from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container } from 'semantic-ui-react'
import Header from '../components/Header';


    export default function VinsParRegion() {

        let {regionID, clientID} = useParams();
        let navigate = useNavigate();
        const [regions1, setRegions1] = useState([]);
        const [vins, setVins] = useState([]);
    
        useEffect(() => {
            fetch('/api/regions')
                .then(res => res.json())
                .then(data => setRegions1(data))
        }, []) 

        useEffect(() => {
            fetch('/api/vins')
                .then(res => res.json())
                .then(data => setVins(data))
        }, []) 


        const afficherVinsIndividuel = (vinsID) => {
            navigate(`/vinsIndividuel/${vinsID}/${clientID}`)
        }


        return (
            <Container>

                <Header client={clientID}/>
                    
                {regions1.map(item => {
                    if (item._id === regionID) {
                        return (
                            <Container style={{marginTop: "5%"}}>
                                <h1>{item.nomRegion}</h1>
                                <div style={{display: "flex"}}>
                                    <img src={require(`../images/regions/${item.imgRegion}`)}
                                         style={{width: "500px", maxWidth: "500px", maxHeight: "450px"}} />
                                    <span style={{width: "40%", marginLeft: "20px"}}>{item.descrRegion}</span>
                                </div>
                            </Container>
                        )
                    }
                })}

                <Container style={{display: "flex", flexWrap: "wrap", marginTop: "50px"}}>
                    {vins.map(item => {
                        if (item.regionID === regionID) {
                            return (
                                <div onClick={() => afficherVinsIndividuel(item._id)}
                                     style={{ width: "220px", 
                                              maxWidth: "220px", 
                                              marginRight: "15px", 
                                              marginTop: "10px"
                                            }}>
                                    <img src={require(`../images/regions/${item.imgVins}`)}
                                        style={{maxHeight: "270px"}} />
                                    <h5>{item.nom}</h5>
                                    <h6>Prix: {item.prix}</h6>
                                </div>
                            )
                        }
                    })}
                </Container>
                
            </Container>
        )
    }