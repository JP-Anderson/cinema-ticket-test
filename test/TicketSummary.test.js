import TicketSummary from '../src/pairtest/lib/TicketSummary.js';
import { summariseTickets } from '../src/pairtest/lib/TicketSummary.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

test('ticket summary construction', () => {
  const summary = new TicketSummary(1,1,1);
  expect(summary.getAdults()).toBe(1);
  expect(summary.getChildren()).toBe(1);
  expect(summary.getInfants()).toBe(1);
});

test('aggregation empty', () => {
  const list = new Array();
  const summary = summariseTickets(list);
  expect(summary.getAdults()).toBe(0);
  expect(summary.getChildren()).toBe(0);
  expect(summary.getInfants()).toBe(0);
});

test('aggregation 1 item', () => {
  const list = new Array(new TicketTypeRequest('ADULT', 5));
  const summary = summariseTickets(list);
  expect(summary.getAdults()).toBe(5);
  expect(summary.getChildren()).toBe(0);
  expect(summary.getInfants()).toBe(0);
});

test('aggregation 3 items', () => {
  const list = new Array(new TicketTypeRequest('ADULT', 5), new TicketTypeRequest('CHILD',2), new TicketTypeRequest('INFANT', 3));
  const summary = summariseTickets(list);
  expect(summary.getAdults()).toBe(5);
  expect(summary.getChildren()).toBe(2);
  expect(summary.getInfants()).toBe(3);
});


test('aggregation 4 items', () => {
  const list = new Array(new TicketTypeRequest('ADULT', 5), new TicketTypeRequest('CHILD',2), new TicketTypeRequest('ADULT', 10), new TicketTypeRequest('INFANT', 3));
  const summary = summariseTickets(list);
  expect(summary.getAdults()).toBe(15);
  expect(summary.getChildren()).toBe(2);
  expect(summary.getInfants()).toBe(3);
});

