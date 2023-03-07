import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { summariseTickets } from './lib/TicketSummary.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    if (!Number.isInteger(accountId)) {
      throw new TypeError('accountId must be an integer');
    }
    if (accountId < 0) {
      throw new TypeError('accountId must be greater than 0');
    }

    const orderSummary = summariseTickets(ticketTypeRequests);
    
    if (orderSummary.getAdults() + orderSummary.getChildren() + orderSummary.getInfants() > 20) {
      throw new InvalidPurchaseException('cannot purchase more than 20 tickets total');
    }
    
    if (orderSummary.getInfants() > orderSummary.getAdults()) {
      throw new InvalidPurchaseException('cannot have more infant seats than adult seats');
    } 
  }
}
