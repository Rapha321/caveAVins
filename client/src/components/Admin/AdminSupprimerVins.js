import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
import { Form, Button } from 'semantic-ui-react'
import { NativeSelect } from '@mui/material';
import { toast } from 'react-toastify';

export default function AdminSupprimerVins() {

  const [regions, setRegions] = useState("");
  const [regionsId, setRegionsId] = useState("");
  const [vins, setVins] = useState("");
  const [vinsId, setVinsId] = useState("");
  const [nomVins, setNomVins] = useState("");
  const [descrVins, setDescrVins] = useState("");
  const [prix, setPrix] = useState("");
  const [qty, setQty] = useState("");


  // Set regions and vins when page is loaded
  useEffect(() => {
    fetch('/api/regions')
    .then(res => res.json())
    .then(data => setRegions(data))

    fetch('/api/vins')
    .then(res => res.json())
    .then(data => setVins(data))
  }, [])


  // Set vinsid, nomVins, descrVins, prix, qty when a vins is 
  // selected in the form
  const handleSelectVins = (e) => {
    e.preventDefault()
    Object.values(vins).map(vin => {
      if (e.target.value === vin._id) {
        setVinsId(vin._id);
        setNomVins(vin.nom);
        setDescrVins(vin.descrVins)
        setPrix(vin.prix)
        setQty(vin.quantity)
      }
    }) 
  }

  
  // Set regionId when a region is selected in the form
  const handleSelectRegion = (e) => {
    e.preventDefault()
    Object.values(regions).map(region => {
      if (e.target.value === region._id) {
        setRegionsId(region._id);
      }
    }) 
  }


  // Function to delete vins from database
  const supprimerVins = async () => {
    // Delete delected vins from database
    await axios({
        method: 'DELETE',
        url: `/api/vins`,
        data: {
            id: vinsId
        }
    })
    .then(res => {
        console.log("mise a jour avec succes")
    })
    .catch(err => {
        console.log(err.response)
    })

    // Reset form fields to empty
    setNomVins("")
    setDescrVins("")
    setPrix("");
    setQty("");

    // Display toast
    toast.success('🦄 Vins supprimer avec success!', {
      toastId: 'info1',
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


  return (
    // FORM TO DELETE VINS FROM DATABASE
    <Container>  
      <div style={{marginLeft: "20%"}}>
        <h2 style={{textAlign: "left", marginTop: "3%", marginBottom: "3%"}}>Supprimer un Vins:</h2> 

        <Form style={{textAlign: "left"}} onSubmit={e => supprimerVins(e)}>

          <NativeSelect id="select" style={{width: "62%"}}  onChange={e => handleSelectRegion(e)}>
            <option value="10" style={{color: "grey"}}>Veuillez choisir une region:</option>
            {
                Object.values(regions).map(region => {
                  return (
                      <option value={region._id}  >{region.nomRegion}</option>
                  )
                }) 
            }
          </NativeSelect><br/><br/>

          <NativeSelect id="select" style={{width: "62%"}}  onChange={e => handleSelectVins(e)}>
            <option value="10" style={{color: "grey"}}>Veuillez choisir un vins pour supprimer?</option>
            {
                Object.values(vins).map(vin => {
                  if (vin.regionID === regionsId) {
                    return (
                      <option value={vin._id} >{vin.nom}</option>
                    )
                  }
                }) 
            }
          </NativeSelect><br/><br/>

          <Form.Group>
              <Form.Input label='Nom Vins:' 
                          type="text" 
                          value={nomVins} 
                          name="newNom" 
                          placeholder='Nom region' 
                          width={10} />
          </Form.Group>
          
          <Form.Group>
              <Form.TextArea label='Descriptions:' 
                            value={descrVins} 
                            name="newDescr" 
                            placeholder='Descriptions:' 
                            width={10} 
                            style={{height: "150px"}}/>
          </Form.Group>

          <Form.Group>
              <Form.Input label='Prix:' 
                          name="newPrix" 
                          value={prix}
                          placeholder='$' 
                          width={5} />
              <Form.Input label='Quantité:' 
                          name="newQty" 
                          value={qty}
                          placeholder='Quantité' 
                          width={5} />
          </Form.Group>
          
          <br />
          <Button color="red" style={{marginLeft: "15%"}}>Supprimer</Button>
        </Form>

      </div>
    </Container>
  )
}
