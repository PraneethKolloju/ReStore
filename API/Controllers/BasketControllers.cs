using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _Store;
        public BasketController(StoreContext store)
        {
            _Store = store;
        }

        [HttpGet(Name = "GetBasket")]

        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(getBuyerId());

            if (basket == null) return NotFound();
            return MapBasketDto(basket);
        }



        [HttpPost]

        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            try
            {
                var basket = await RetrieveBasket(getBuyerId());

                if (basket == null) basket = CreateBasket();

                var product = await _Store.Products.FindAsync(productId);


                if (product == null) return NotFound();

                basket.AddItem(product, quantity);

                var result = await _Store.SaveChangesAsync() > 0;

                if (result) return CreatedAtRoute("GetBasket", MapBasketDto(basket));

                return BadRequest(new ProblemDetails { Title = "Problem in adding data to basket" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]

        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {

            var basket = await RetrieveBasket(getBuyerId());
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _Store.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem while removing item" });
        }


        [HttpGet]
        private async Task<Basket?> RetrieveBasket(string buyerId)
        {
            if (buyerId == null) return null;

            return await _Store.Baskets
                            .Include(i => i.Items)
                            .ThenInclude(i => i.Product)
                            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }




        private Basket CreateBasket()
        {

            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookiesOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookiesOptions);
            }
            var cookiesOption = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append("buyerId", buyerId, cookiesOption);
            var basket = new Basket { BuyerId = buyerId };
            _Store.Baskets.Add(basket);
            return basket;
        }


        [HttpGet]
        private BasketDto MapBasketDto(Basket? basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
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

        private string getBuyerId()
        {
            return User.Identity.Name ?? Request.Cookies["buyerId"];
        }

    }
}