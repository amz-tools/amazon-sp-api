export type ReportDocumentType = GeneralFlatFileAllOrdersDataByOrderDate | any;

interface GeneralFlatFileAllOrdersDataByOrderDate {
  "amazon-order-id": string;
  "merchant-order-id": string;
  "purchase-date": string;
  "last-updated-date": string;
  "order-status": string;
  "fulfillment-channel": string;
  "sales-channel": string;
  "order-channel": string;
  "ship-service-level": string;
  "product-name": string;
  sku: string;
  asin: string;
  "number-of-items": string;
  "item-status": string;
  "tax-collection-model": string;
  "tax-collection-responsible-party": string;
  quantity: string;
  currency: string;
  "item-price": string;
  "item-tax": string;
  "shipping-price": string;
  "shipping-tax": string;
  "gift-wrap-price": string;
  "gift-wrap-tax": string;
  "item-promotion-discount": string;
  "ship-promotion-discount": string;
  "address-type": string;
  "ship-city": string;
  "ship-state": string;
  "ship-postal-code": string;
  "ship-country": string;
  "promotion-ids": string;
  "is-business-order": string;
  "purchase-order-number": string;
  "price-designation": string;
}
