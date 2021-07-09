import React from 'react'
import ReactDOM from 'react-dom'
import { AppointmentsDayView } from './AppointmentsDayView'
import { sampleAppointments } from './sampleData'
import { CustomerForm } from './CustomerForm'

ReactDOM.render(
    // <AppointmentsDayView appointments={sampleAppointments} />,
    <CustomerForm />,
    document.getElementById('root')
)