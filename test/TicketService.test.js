import TicketService from '../src/pairtest/TicketService.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../src/thirdparty/seatbooking/SeatReservationService.js';

jest.mock('../src/thirdparty/paymentgateway/TicketPaymentService.js');
jest.mock('../src/thirdparty/seatbooking/SeatReservationService.js');

const service = new TicketService();

beforeEach(() => {
  TicketPaymentService.mockClear();
  SeatReservationService.mockClear();
});

test('invalid account ID returns exception', () => {
  expect(() => service.purchaseTickets("10", null)).toThrow('accountId must be an integer')
  expect(() => service.purchaseTickets(-1, null)).toThrow('accountId must be greater than 0') 
});

test('invalid ticket type errors are captured', () => {
  expect(() => service.purchaseTickets(1, new TicketTypeRequest('ADULT', 2), 'ADULT')).toThrow('ticketTypeRequests must contain only TicketTypeRequest objects');
});

test('empty orders return an error', () => {
  expect(() => service.purchaseTickets(1, new Array())).toThrow('ticketTypeRequests must contain only TicketTypeRequest objects');
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
  const mockPaymentInstance = TicketPaymentService.mock.instances[0];
  const mockMakePayment = mockPaymentInstance.makePayment;
  expect(mockMakePayment).toHaveBeenCalledWith(1, expectedPrice);
  expect(mockMakePayment).toHaveBeenCalledTimes(1);
});

/// Seat reservation

test('order with adult and child correctly allocates seats', () => {
  const expectedSeats = 2;
  const service = new TicketService();
  service.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('CHILD', 1));
  const mockSeatingInstance = SeatReservationService.mock.instances[0];
  const mockReserveSeats = mockSeatingInstance.reserveSeat;
  expect(mockReserveSeats).toHaveBeenCalledWith(1, expectedSeats);
  expect(mockReserveSeats).toHaveBeenCalledTimes(1);
});


test('order with adult and infant does not allocate new seat for infant', () => {
  const expectedSeats = 1;
  const service = new TicketService();
  service.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('INFANT', 1));
  const mockSeatingInstance = SeatReservationService.mock.instances[0];
  const mockReserveSeats = mockSeatingInstance.reserveSeat;
  expect(mockReserveSeats).toHaveBeenCalledWith(1, expectedSeats);
  expect(mockReserveSeats).toHaveBeenCalledTimes(1);
});
