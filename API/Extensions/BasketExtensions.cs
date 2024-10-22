using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

public static class BasketExtensions
{

    public static BasketDto MapBasketDto(this Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            PaymentIntentId = basket.PaymentIntentId,
            ClientSecret = basket.ClientSecret,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                PictureUrl = x.Product.PictureUrl,
                Type = x.Product.Type,
                Brand = x.Product.Brand,
                Quantity = x.Quantity
            }).ToList()
        };
    }

    public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
    {
        return query
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .Where(b => b.BuyerId == buyerId);
    }
}