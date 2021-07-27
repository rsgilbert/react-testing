import React, {useEffect, useState} from 'react'
import {AppointmentForm} from "./AppointmentForm";

export const AppointmentFormLoader = props => {
    const [availableTimeSlots, setAvailableTimeSlots] = useState([])

    useEffect(() => {
        const fetchAvailableTimeSlots = async () => {
            const result = await window.fetch('/availableTimeSlots', {
                method: 'GET', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }
            })
            if(result.ok) {
                setAvailableTimeSlots(await result.json())
            }
        }
        fetchAvailableTimeSlots()
    }, [])
    return (
        <div>
            <AppointmentForm
                { ...props } // <-- including customer
                availableTimeSlots={availableTimeSlots} />
        </div>
    )
}