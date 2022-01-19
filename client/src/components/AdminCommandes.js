import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Navbar, Container } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

export default function AdminCommandes() {

    let navigate = useNavigate()
    const [commandes, setCommandes] = useState([])

    useEffect(() => {
        let isMounted = true;
        fetch('/api/commandes')
            .then(res => res.json())
            .then(data => { if (isMounted) {setCommandes(data)} })

        return () => {isMounted = false};
    }, [])


    const commandeEnRoute = (commandeRef, vinsRef) => {

        commandes.map(commande => {
            Object.values(commande.item).map(vin => {
                if (commande._id === commandeRef && vin.vinsID === vinsRef) {
                    axios.post(`/api/commandes/update/${commande._id}`, {
                        status: "En route" 
                    })
                    .then(res => {
                        console.log("mise a jour avec succes")
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                }
            })
        })

        getCommandes()
    
    }

    const commandeLivrer = (commandeRef, vinsRef) => {

        commandes.map(commande => {
            Object.values(commande.item).map(vin => {
                if (commande._id === commandeRef && vin.vinsID === vinsRef) {
                    axios.post(`/api/commandes/update/${commande._id}`, {
                        status: "Livré" 
                    })
                    .then(res => {
                        console.log("mise a jour avec succes")
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                }
            })
        })

        getCommandes()
    
    }

    // Read
    const getCommandes = async () => {
        const res = await axios.get('/api/commandes')
        const data = res.data
        setCommandes(data)
    }


    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><h1>Cave à Vins</h1></Navbar.Brand>
                    <Button inverted color='blue' onClick={() => {navigate(`/admin`)}}>Menu administrateur</Button>
                    <Navbar.Toggle />
                </Container>
            </Navbar>

            
            <Container>  
            <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Gestion de commandes:</h2>  
                <thead>
                    <tr>
                        <th>ID commande</th>
                        <th>Quantité</th>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Statue du commande</th>
                    </tr>  
                </thead>

                <tbody>
                    {commandes.map(commande => {
                            return (
                                Object.values(commande.item).map(x => {
                                   
                                    return (
                                        <tr key={`${commande._id}_${x.vinsID}`} >
                                            <td style={{padding: "10px 4px"}}>{commande._id}</td>
                                            <td width="100px">{x.quantity}</td>
                                            <td align='left'>{x.nom}</td>
                                            <td width="80px">{x.prix}</td>
                                            <td width="250px">{commande.status}</td>
                                            <Button size="mini" color={commande.status === 'En préparation' ? 'blue' : 'grey'}
                                                    onClick={() => commandeEnRoute(commande._id, x.vinsID)} 
                                                    style={{marginLeft: "15px"}}>
                                                En route
                                            </Button>
                                            <Button size="mini" color={commande.status === 'Livré' ? 'grey' : 'green'} 
                                                    style={{marginLeft: "15px"}} 
                                                    onClick={() => commandeLivrer(commande._id, x.vinsID)} >
                                                Livré
                                            </Button>
                                        </tr>
                                    )
                                })
                            )
                    })}
                </tbody>
            </Container>

        </div>
    )
}
