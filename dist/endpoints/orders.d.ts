export declare function createOrder(params: any): Promise<unknown>;
export declare function batchCreateOrders(batch: any): Promise<unknown>;
export declare function cancelOrder(orderId: string, symbol: string): Promise<unknown>;
export declare function getOrders(symbol?: string, status?: string): Promise<unknown>;
