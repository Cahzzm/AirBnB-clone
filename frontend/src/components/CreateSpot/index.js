import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addSpotImageThunk, createSpotThunk } from "../../store/spot";
import { states } from "../utils"
import "./createspot.css"

const CreateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    // const [lat, setLatitude] = useState(0)
    // const [lng, setLongitude] = useState(0)
    const [price, setPrice] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [errorValidations, setErrorValidations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            price,
            description,
            ownerId: sessionUser,
        }
        let createdSpot = await dispatch(createSpotThunk(newSpot))

        if(createdSpot && imageUrl) {

            const image = {
                url: imageUrl,
                preview: true
            }

            await dispatch(addSpotImageThunk(image, createdSpot))

            history.push(`/spots/${createdSpot?.id}`)
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
                            maxLength="25"
                            type="text"
                            placeholder="Spot Name"
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
                            type="text"
                            placeholder="Latitude"
                            value={lat}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </label>
                    <label>Longitude:
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </label> */}
                    <label>
                        <input
                            type="text"
                            placeholder="Cost per night"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="url"
                            placeholder="Image url"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Description"
                            maxLength="100"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    <button
                    className="host-form"
                    disabled={errorValidations.length > 0}
                    type="submit"
                    >
                        Create New Spot
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


export default CreateSpot
