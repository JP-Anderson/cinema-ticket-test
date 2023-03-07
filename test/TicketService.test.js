import TicketService from '../src/pairtest/TicketService.js';

const service = new TicketService();

test('invalid account ID returns exception', () => {

  expect(() => service.purchaseTickets("10", null)).toThrow('accountId must be an integer')

  expect(() => service.purchaseTickets(-1, null)).toThrow('accountId must be greater than 0') 
});

// Test Plan

/// Invalid orders 

// 21 tickets is invalid when all adult tickets
// 21 tickets is invalid with mixture of adult and infant tickets
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
