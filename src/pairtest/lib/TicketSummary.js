export default class TicketSummary {
  #adultCount;
  #childCount;
  #infantCount;

  constructor(adults, children, infants) {
    if (!Number.isInteger(adults)) {
      throw new TypeError("adults must be int");
    }
    if (!Number.isInteger(children)) {
      throw new TypeError("children must be int");
    }
    if (!Number.isInteger(infants)) {
      throw new TypeError("infants must be int");
    }
    this.#adultCount = adults;
    this.#childCount = children;
    this.#infantCount = infants;
    Object.freeze(this);
  }

  getAdults() {
    return this.#adultCount;
  }

  getChildren() {
    return this.#childCount;
  }

  getInfants() {
    return this.#infantCount;
  }
}

export function summariseTickets(tickets) {
  if (!Array.isArray(tickets)) {
    throw new TypeError("expect array");
  }
  if (tickets.length == 0) {
    return new TicketSummary(0,0,0);
  }
  const summary = summariseTickets(tickets.slice(1));
  const head = tickets[0];
  if (head.getTicketType() == 'ADULT') {
    return new TicketSummary(head.getNoOfTickets()+summary.getAdults(), summary.getChildren(), summary.getInfants());
  }
  if (head.getTicketType() == 'CHILD') {
    return new TicketSummary(summary.getAdults(), head.getNoOfTickets()+summary.getChildren(), summary.getInfants());
  }
  if (head.getTicketType() == 'INFANT') {
    return new TicketSummary(summary.getAdults(), summary.getChildren(), head.getNoOfTickets()+summary.getInfants());
  }
  return summary;
}

