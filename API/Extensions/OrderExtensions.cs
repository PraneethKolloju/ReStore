using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query.Select(order =>
                new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(i => new OrderItemDto
                    {
                        ProductId = i.ItemOrdered.ProductId,
                        Name = i.ItemOrdered.Name,
                        PictureUrl = i.ItemOrdered.PictureUrl,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                }
            ).AsNoTracking();
        }
    }
}