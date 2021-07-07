const today = new Date();
const at = hours => today.setHours(hours, 0)
const cust = (firstName, lastName, phoneNumber, stylist, service, notes ) => ({ firstName, lastName, phoneNumber, stylist, service, notes })

export const sampleAppointments = [
    { startsAt: at(5), customer: cust('John', 'Lubega', '07012328943', 'Mukasa', 'Cut', 'Tidy') },
    { startsAt: at(15), customer: cust('Mark', 'Solo', '07011118943', 'Grad', 'Sharp', 'Lousy') },
    { startsAt: at(4), customer: cust('Simon', 'Lubega', '07012328943', 'Joseph', 'All', 'generous and cheap') },
    { startsAt: at(2), customer: cust('Joseph', 'Lubega', '07012328943', 'Mukasa', 'Cut', 'Tidy') },
    { startsAt: at(8), customer: cust('Peter', 'Lubega', '07012328943', 'Mukasa', 'Cut', 'Tidy') },
    { startsAt: at(9), customer: cust('Ronald', 'Lubega', '07012328943', 'Mukasa', 'Cut', 'Tidy') },
    { startsAt: at(20), customer: cust('Mark') },
    { startsAt: at(11), customer: cust('John') },
    { startsAt: at(0), customer: cust('Mathew') },
]