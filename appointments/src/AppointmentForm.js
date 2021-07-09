import React from 'react'

export const AppointmentForm = ({ selectableServices }) => {

    return (
        <form id="appointment">
            <select name="service">
                <option />
                { selectableServices.map(service =>
                    <option key={service}>{service}</option>)
                }
            </select>
        </form>
    )
}

AppointmentForm.defaultProps = {
    selectableServices: [
        'Cut',
        'Brush',
        'Kawalata',
        'Beard trim'
    ]
}