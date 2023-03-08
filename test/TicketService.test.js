import TicketService from '../src/pairtest/TicketService.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService.js';

jest.mock('../src/thirdparty/paymentgateway/TicketPaymentService.js');
const service = new TicketService();

beforeEach(() => {
  TicketPaymentService.mockClear();
});

test('invalid account ID returns exception', () => {
  expect(() => service.purchaseTickets("10", null)).toThrow('accountId must be an integer')
  expect(() => service.purchaseTickets(-1, null)).toThrow('accountId must be greater than 0') 
});

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

test('cannot have orders without adult', () => {
  const errorMessage = 'cannot have an order with no adult seats'

  expect(() => service.purchaseTickets(11, new TicketTypeRequest('CHILD', 1))).toThrow(errorMessage)
  expect(() => service.purchaseTickets(11, new TicketTypeRequest('INFANT', 1))).toThrow(errorMessage)
  expect(() => service.purchaseTickets(12, new TicketTypeRequest('INFANT', 2), new TicketTypeRequest('CHILD', 6))).toThrow(errorMessage)
});

/// Pricing

test('correct payment made for order with adults', () => {
  const expectedPrice = 4000;
  const service = new TicketService();
  service.purchaseTickets(1, new TicketTypeRequest('ADULT', 2));
  const mockPaymentInstance = TicketPaymentService.mock.instances[0]
  const mockMakePayment = mockPaymentInstance.makePayment;
  expect(mockMakePayment).toHaveBeenCalledWith(1, expectedPrice);
  expect(mockMakePayment).toHaveBeenCalledTimes(1);
});

test('correct payment made for order with adult and child', () => {
  const expectedPrice = 3000;
  const service = new TicketService();
  service.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('CHILD', 1));
  const mockPaymentInstance = TicketPaymentService.mock.instances[0]
  const mockMakePayment = mockPaymentInstance.makePayment;
  expect(mockMakePayment).toHaveBeenCalledWith(1, expectedPrice);
  expect(mockMakePayment).toHaveBeenCalledTimes(1);
});

test('correct payment made for order with adult and infant', () => {
  const expectedPrice = 2000;
  const service = new TicketService();
  service.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('INFANT', 1));
  const mockPaymentInstance = TicketPaymentService.mock.instances[0]
  const mockMakePayment = mockPaymentInstance.makePayment;
  expect(mockMakePayment).toHaveBeenCalledWith(1, expectedPrice);
  expect(mockMakePayment).toHaveBeenCalledTimes(1);
});

/// Seat reservation

// correctly calculate and call number of seat allocation for order not including infants
// correctly calculate and call number of sear allocation for order including infants (they don't use extra seat)
