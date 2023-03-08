# Code overview

- summariseTickets func in `/src/pairtest/lib/TicketSummary.js` will build a simple immutable object of type TicketSummary which summarises an order.
- summariseTickets uses a recursive style which recursively calls on the list tail to avoid looping.
- further functions will be carried out on TicketSummary object which simplifies their logic and testing.
- business rules such as orders require adult, need less infants than adults, etc. are carried out in the purchaseTickets function
- pricing rules and seat calculation rules are coded in their own modules `lib/Pricing.js` and `lib/Seating.js`
