using API.Data;
using API.DTOs;
using API.Services;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _storeContext;
        public PaymentController(PaymentService paymentService, StoreContext storeContext)
        {
            _paymentService = paymentService;
            _storeContext = storeContext;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdateIntent()
        {
            var basket = await _storeContext.Baskets
                            .RetrieveBasketWithItems(User.Identity.Name)
                            .FirstOrDefaultAsync();

            if (basket == null) return NotFound();

            var intent = await _paymentService.CreateorUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;

            basket.ClientSecret = intent.ClientSecret;

            _storeContext.Update(basket);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem occured" });

            return basket.MapBasketDto();
        }
    }
}
