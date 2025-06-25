export interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  }