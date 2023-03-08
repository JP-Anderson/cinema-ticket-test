# To run

`npm test`

# Code overview

- summariseTickets func in `/src/pairtest/lib/TicketSummary.js` will build a simple immutable object of type TicketSummary which summarises an order.
- summariseTickets uses a recursive style which recursively calls on the list tail to avoid looping.
- summariseTickets also performs validation to ensure each object is a valid ticket object, to avoid processing the tickets array more than once, but we could move this into `TicketService.validation` for a stricter separation of concerns, [as it was in this commit](https://github.com/JP-Anderson/cinema-ticket-test/commit/8f14d18efc79960a8b6bc4e3bd7723bfe3525af7).
- further functions will be carried out on TicketSummary object which simplifies their logic and testing.
- business rules such as orders require adult, need less infants than adults, etc. are carried out in the purchaseTickets function
- pricing rules and seat calculation rules are coded in their own modules `lib/Pricing.js` and `lib/Seating.js`
- pricing rules currently use pennies rather than pounds. Selected this option to avoid having to deal with doubles for currency, which are not accurate. Would be a simple change to `lib/Pricing.js` to add a new function to deal in pounds, but would potentially have to introduce some new data type to handle decimals.
