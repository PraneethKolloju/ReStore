using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Entities.OrderAggregate;

[Owned]
public class ShippingAddress : Address
{

}