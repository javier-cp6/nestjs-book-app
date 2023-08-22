export class OrderDto {
  readonly userId: string;
  readonly bookId: string;
}

export class UpdateOrderDto {
  readonly orderId: string;
  readonly userId: string;
}