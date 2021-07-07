const today = new Date();
const at = hours => today.setHours(hours, 0)
const cust = name => ({ firstName: name })

export const sampleAppointments = [
    { startsAt: at(5), customer: cust('John') },
    { startsAt: at(15), customer: cust('Mark') },
    { startsAt: at(4), customer: cust('Simon') },
    { startsAt: at(2), customer: cust('Joseph') },
    { startsAt: at(8), customer: cust('Peter') },
    { startsAt: at(9), customer: cust('Ronald') },
    { startsAt: at(20), customer: cust('Mark') },
    { startsAt: at(11), customer: cust('John') },
    { startsAt: at(0), customer: cust('Mathew') },
]