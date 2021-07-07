import React, { useState } from 'react'

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':')
    return `${h}:${m}`
}

export const Appointment = ({ customer, startsAt }) => {
    return (
        <div>
            <h1>Today's appointment at {appointmentTimeOfDay(startsAt)}</h1>
            <table>
            <tbody>
                <tr>
                    <th>Customer</th>
                    <td>
                        {`${customer.firstName} ${customer.lastName}` }
                    </td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>{customer.phoneNumber}</td>
                </tr>
                <tr>
                    <th>Stylist</th>
                    <td>{ customer.stylist }</td>
                </tr>
                <tr>
                    <th>Service</th>
                    <td>{ customer.service }</td>
                </tr>
                <tr>
                    <th>Notes</th>
                    <td>{ customer.notes }</td>                    
                </tr>
            </tbody>
        </table>
        </div>
    )
}


export const AppointmentsDayView = ({ appointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0)

    return (
        <div id='appointmentsDayView'>
            <ol>
                { appointments.map((appointment, index) =>
                    <li key={appointment.startsAt}>
                        <button
                            type="button"
                            onClick={() => setSelectedAppointment(index)}
                            >
                            { appointmentTimeOfDay(appointment.startsAt) }
                        </button>
                    </li>
                )}
            </ol>
            {(appointments.length === 0) ? (
                <p>There are no appointments scheduled for today.</p>
            ) : (
                <Appointment {...appointments[selectedAppointment]} />
            )}
        </div>
    )
}