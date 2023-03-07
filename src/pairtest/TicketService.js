import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

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
  }
}
