using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        public OrderController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _storeContext.Orders.ProjectOrderToOrderDto().Where(i => i.BuyerId == User.Identity.Name).ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            return await _storeContext.Orders.ProjectOrderToOrderDto().Where(i => i.Id == id && i.BuyerId == User.Identity.Name).FirstOrDefaultAsync();
        }

        [HttpPost]

        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            // var Basket = _storeContext.Baskets.Where(i => i.BuyerId == orderDto.ShippingAddress.FullName).FirstOrDefault();



            var Basket = await _storeContext.Baskets
                         .RetrieveBasketWithItems(User.Identity.Name)
                         .FirstOrDefaultAsync();

            var Items = new List<OrderItem>();

            if (Basket == null) return NotFound();

            foreach (var item in Basket.Items)
            {

                var productItem = _storeContext.Products.Where(i => i.Id == item.ProductId).FirstOrDefault();

                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl,
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                };

                Items.Add(orderItem);
                productItem.QuantityInStock = -item.Quantity;

            }

            var subtotal = Items.Sum(i => i.Price * i.Quantity);
            var devliveryFee = subtotal > 10000 ? 0 : 100;

            var order = new Order
            {
                BuyerId = User.Identity.Name,
                OrderItems = Items,
                Subtotal = subtotal,
                DeliveryFee = devliveryFee,
                ShippingAddress = orderDto.ShippingAddress,
                PaymentIntentId = "",
            };

            _storeContext.Orders.Add(order);
            _storeContext.Baskets.Remove(Basket);

            if (orderDto.SaveAddress)
            {
                var user = await _storeContext.Users.Where(i => i.UserName == orderDto.ShippingAddress.FullName).FirstOrDefaultAsync();

                user.Address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress?.FullName,
                    Address1 = orderDto.ShippingAddress?.Address1,
                    Address2 = orderDto.ShippingAddress?.Address2,
                    City = orderDto.ShippingAddress?.City,
                    Zip = orderDto.ShippingAddress?.Zip,
                    Country = orderDto.ShippingAddress?.Country,
                    State = orderDto.ShippingAddress?.State,
                };

                _storeContext.Update(user);
            }

            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
            }
            return BadRequest();



        }
    }

}
