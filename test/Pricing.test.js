import { calculatePriceInPence } from '../src/pairtest/lib/Pricing.js';
import TicketSummary from '../src/pairtest/lib/TicketSummary.js';

test('test adult price is 2000', () => {
  const summary = new TicketSummary(1,0,0);;
  expect(calculatePriceInPence(summary)).toBe(2000);
});

test('test child price is 1000', () => {
  const summary = new TicketSummary(0,1,0);;
  expect(calculatePriceInPence(summary)).toBe(1000);
});

test('test infant price is 0', () => {
  const summary = new TicketSummary(0,0,1);;
  expect(calculatePriceInPence(summary)).toBe(0);
});
