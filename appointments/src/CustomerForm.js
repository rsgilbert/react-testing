import React from 'react'


export const CustomerForm = ({ firstName, onSubmit }) => {
    const customer = { firstName }
    return(
        <form id="customer" onSubmit={() => onSubmit(customer)}>
            <label htmlFor="firstName">First Name</label>
            <input 
                type="text"
                name="firstName"
                value = {firstName}
                id="firstName"
                readOnly
                />
        </form>
    )
}




