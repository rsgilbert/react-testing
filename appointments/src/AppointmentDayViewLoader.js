import React, { useEffect, useState } from 'react'
import {AppointmentsDayView} from "./AppointmentsDayView";


export const AppointmentsDayViewLoader = ({ today }) => {
     const [appointments, setAppointments] = useState([])
    const from = today.setHours(0, 0, 0, 0)
    const to = today.setHours(23, 59, 59, 999)

    useEffect(() => {
        const fetchTodayAppointments = async () => {
            const result = await window.fetch(`/appointments/${from}-${to}`, {
                method: 'GET', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }
            })
            if(result.ok) {
                setAppointments(await result.json())
            }
        }
        fetchTodayAppointments()
    }, [today])
    return (
        <AppointmentsDayView appointments={appointments} />
    )
}

AppointmentsDayViewLoader.defaultProps = {
    today: new Date()
}