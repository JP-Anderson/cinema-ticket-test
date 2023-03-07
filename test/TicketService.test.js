import TicketService from '../src/pairtest/TicketService.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';

const service = new TicketService();

test('invalid account ID returns exception', () => {
  expect(() => service.purchaseTickets("10", null)).toThrow('accountId must be an integer')
  expect(() => service.purchaseTickets(-1, null)).toThrow('accountId must be greater than 0') 
});


// Test Plan

/// Invalid orders 

test('over 20 tickets triggers exception', () => {
  const errorMessage = 'cannot purchase more than 20 tickets total'  

  expect(() => service.purchaseTickets(10, new TicketTypeRequest('ADULT', 21))).toThrow(errorMessage)
  expect(() => service.purchaseTickets(11, new TicketTypeRequest('ADULT', 15), new TicketTypeRequest('CHILD', 6))).toThrow(errorMessage)
  expect(() => service.purchaseTickets(12, new TicketTypeRequest('ADULT', 18), new TicketTypeRequest('CHILD', 1), new TicketTypeRequest('INFANT', 2))).toThrow(errorMessage)
});

test('cannot have more infants than adults', () => {
  const errorMessage = 'cannot have more infant seats than adult seats'
  
  expect(() => service.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('INFANT', 2))).toThrow(errorMessage)
});

// a ticket order with more infants than adults ticket is invalid
// a ticket order with child tickets is not valid without 1+ adult
// a ticket order with infant tickets is not valid without 1+ adult

/// Pricing

// correctly calculate price for order with adults
// correctly calculate price for order with adults and children
// correctly calculate price for order with adults, children, and infants

/// Seat reservation

// correctly calculate and call number of seat allocation for order not including infants
// correctly calculate and call number of sear allocation for order including infants (they don't use extra seat)
