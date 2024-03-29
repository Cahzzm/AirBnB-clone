import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { states } from '../utils.js'
import { editSpotThunk } from "../../store/spot"
import './editspot.css'
import { Link } from "react-router-dom";

const EditSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)
    const { spotId } = useParams()
    const spotDetails = useSelector(state => state.spots.singleSpot)
    const [name, setName] = useState(spotDetails.name)
    const [address, setAddress] = useState(spotDetails.address)
    const [city, setCity] = useState(spotDetails.city)
    const [state, setState] = useState(spotDetails.state)
    const [country, setCountry] = useState(spotDetails.country)
    // const [lat, setLatitude] = useState(spotDetails.lat)
    // const [lng, setLongitude] = useState(spotDetails.lng)
    const [price, setPrice] = useState(spotDetails.price)
    const [description, setDescription] = useState(spotDetails.description)
    const [errorValidations, setErrorValidations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            // lat,
            // lng,
            price,
            description,
            ownerId: session.user.id,
        }

        let editedSpot = await dispatch(editSpotThunk(newSpot, spotDetails.id))

        if(editedSpot){
            history.push(`/spots/${spotId}`)
        }
    }

    useEffect(() => {
        const errors = []
        if(name?.length === 0) errors.push("Please provide a name")
        if(address?.length === 0) errors.push("Please provide an address")
        if(city?.length === 0) errors.push("Please provide a city")
        if(state?.length === 0) errors.push("Please provide a state")
        if(country?.length === 0) errors.push("Please provide a country")
        // if(!lat || isNaN(lat)) errors.push("Please provide a valid latitude")
        // if(!lng || isNaN(lng)) errors.push("Please provide a valide longitude")
        if(price <= 0) errors.push("Please provid a price")
        if(description?.length === 0) errors.push("Please provide a description")

        setErrorValidations(errors)
    }, [name, address, city, state, country, price, description])


    return (
        <main className="form-container-holder">
        <div id="form-container">
            <h1>Host Form</h1>
            <div id="host-forms">
                <ul>
                    {errorValidations.map(error => (
                        <div style={{color: 'red'}} key={error}>{error}</div>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Spot Name"
                            maxLength="25"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Address"
                            maxLength="50"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="City"
                            maxLength="50"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <select
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={e => setState(e.target.value)}
                        >
                            {states.map(state => (
                                <option key={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Country"
                            maxLength="50"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                    </label>
                    {/* <label>Latitude:
                        <input
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </label>
                    <label>Longitude:
                        <input
                            type="number"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </label> */}
                    <label>
                        <input
                            type="number"
                            placeholder="Cost per night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            maxLength="100"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <button
                    className="host-form"
                    disabled={errorValidations.length > 0}
                    type="submit"
                    >
                        Submit Edit
                    </button>
                    <Link id='cancel-host-form' exact to="/">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
        </main>
    )
}

export default EditSpot
