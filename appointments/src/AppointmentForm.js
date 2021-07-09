import React from 'react'

export const AppointmentForm = ({ selectableServices, service }) => {

    return (
        <form id="appointment">
            <select name="service" value={service} readOnly>
                <option />
                { selectableServices.map(s =>
                    <option key={s}>{s}</option>)
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