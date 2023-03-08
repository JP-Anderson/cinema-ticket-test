import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { summariseTickets } from './lib/TicketSummary.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import { calculatePriceInPence } from './lib/Pricing.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import { calculateSeats } from './lib/Seating.js';

export default class TicketService {
  
  #paymentService;
  #seatingService;

  constructor() {
    this.#paymentService = new TicketPaymentService();
    this.#seatingService = new SeatReservationService();
  }
  
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
    
    if (orderSummary.getAdults() == 0 && orderSummary.getChildren() + orderSummary.getInfants()) {
      throw new InvalidPurchaseException('cannot have an order with no adult seats');
    }
 
    if (orderSummary.getInfants() > orderSummary.getAdults()) {
      throw new InvalidPurchaseException('cannot have more infant seats than adult seats');
    }

    this.#paymentService.makePayment(accountId, calculatePriceInPence(orderSummary)); 
    this.#seatingService.reserveSeat(accountId, calculateSeats(orderSummary));
  }
    
}
