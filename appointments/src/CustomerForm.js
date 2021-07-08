import React, { useState } from 'react'


export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
    const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })

    const handleChangeFirstName = ({ target }) => 
        setCustomer(customer => ({ ...customer, firstName: target.value }))
    
    const handleChangeLastName = ({ target }) => 
        setCustomer(customer => ({ ...customer, lastName: target.value }))

    const handleChangePhoneNumber = ({ target }) => 
        setCustomer(customer => ({ ...customer, phoneNumber: target.value }))

    return(
        <form id="customer" onSubmit={() => onSubmit(customer)}>
            <label htmlFor="firstName">First Name</label>
            <input 
                type="text"
                name="firstName"
                value = {firstName}
                id="firstName"
                onChange={event => handleChangeFirstName(event)}
                />
            <label htmlFor="lastName">Last Name</label>
            <input 
                type="text"
                name="lastName"
                value={lastName}
                id="lastName"
                onChange={event => handleChangeLastName(event)}
                />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                id="phoneNumber"
                onChange={handleChangePhoneNumber}
                />
        </form>
    )
}




