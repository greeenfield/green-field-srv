import { AggregateRoot } from '@nestjs/cqrs'

export type UserRequireProperties = Required<{
  readonly id: string
  readonly username: string
  readonly email: string
}>

export type UserOptionalProperties = Partial<{
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProperties = UserRequireProperties & UserOptionalProperties

export type UserProfileRequireProperties = Required<{
  readonly id: string
}>

export type UserProfileOptionalProperties = Partial<{
  readonly nickname: string
  readonly thumbnail: string
  readonly about: string
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProfileProperties = UserProfileRequireProperties & UserProfileOptionalProperties

export interface User {
  userProperties: () => UserProperties
  profileProperties: () => UserProfileProperties
}

// @Table(name = "orders")
// public class Order {
//   // ...
//   public static class Builder {
//     private List<LineItem> lineItems = new ArrayList<>();
//     private List<OrderPayment> payments = new ArrayList<>();
//     private ShippingAddress shippingAddress;
//     public Builder() {
//     }
//     public Builder addOrderPayment(OrderPayment orderPayment) {
//       this.payments.add(orderPayment);
//       return this;
//     }
//     public Builder addLineItem(LineItem lineItem) {
//       this.lineItems.add(lineItem);
//       return this;
//     }
//     public Builder shippingAddress(ShippingAddress shippingAddress) {
//       this.shippingAddress = shippingAddress;
//       return this;
//     }
//     public Order build() {
//       return new Order(this);
//     }
//   }
export class UserImplement extends AggregateRoot implements User {
  // private readonly id: string = ''
  // private readonly username: string = ''
  // private email: string
  // private nickname: string | null = null
  // private password: string | null = null
  // private thumbnail: string | null = null
  // private about: string | null = null
  // private readonly createdAt: Date = new Date()
  // private readonly updatedAt: Date = new Date()
  private _user: UserProperties
  private _profile: UserProfileProperties

  constructor() {
    super()
    // Object.assign(this, properties)
  }

  setUser(properties: UserProperties) {
    this._user = properties
  }

  setProfile(properties: UserProfileProperties) {
    this._profile = properties
  }

  profileProperties() {
    return this._profile
  }

  userProperties(): UserProperties {
    return this._user
  }
}
