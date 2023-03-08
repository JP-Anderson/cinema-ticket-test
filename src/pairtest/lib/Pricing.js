import TicketSummary from './TicketSummary.js';

const adultPriceInPennies = 2000
const childPriceInPennies = 1000
const infantPriceInPennies = 0

export function calculatePriceInPence(ticketSummary) {
  return ticketSummary.getAdults() * adultPriceInPennies + ticketSummary.getChildren() * childPriceInPennies + ticketSummary.getInfants() * infantPriceInPennies;
}

