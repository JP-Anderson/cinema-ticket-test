import TicketSummary from './TicketSummary.js';

const seatsPerAdult = 1
const seatsPerChild = 1
const seatsPerInfant = 0

// calculateSeats calculates the number of seats required for an order.
// Note, it assumes the order has already been validated and it doesn't attempt
// to validate an order.
// e.g. an order of 2 adults and 3 infants would return 2 seats required, as infants
// do not require seats. However the validation of an order requiring more adults
// than infants should be handled elsewhere.
export function calculateSeats(ticketSummary) {
  return ticketSummary.getAdults() * seatsPerAdult + ticketSummary.getChildren() * seatsPerChild;
}

