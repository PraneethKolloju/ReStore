using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _user;
        private readonly TokenService _tokenService;

        private readonly StoreContext _store;
        public AccountController(UserManager<User> user, TokenService tokenService, StoreContext storeContext)
        {
            _store = storeContext;
            _tokenService = tokenService;
            _user = user;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto logindto)
        {
            var user = await _user.FindByNameAsync(logindto.Username);
            if (user == null || !await _user.CheckPasswordAsync(user, logindto.Password))
                return Unauthorized();

            var userBasket = await RetrieveBasket(logindto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null)
                    _store.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _store.SaveChangesAsync();
            }


            if (anonBasket == null && userBasket == null)
            {
                return new UserDto
                {
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user),
                    Basket = null,
                };
            }
            else
            {
                return new UserDto
                {
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user),
                    Basket = anonBasket != null ? anonBasket.MapBasketDto() : userBasket.MapBasketDto(),
                };
            }
        }

        [HttpPost("register")]

        public async Task<ActionResult<User>> Register(RegisterDto register)
        {
            var user = new User
            {
                UserName = register.Username,
                Email = register.Email
            };

            var result = await _user.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(new ValidationProblemDetails(ModelState));
            }

            await _user.AddToRoleAsync(user, "MEMBER");

            return StatusCode(201);

        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _user.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            var basket = await _store.Baskets
            .Where(b => b.BuyerId == buyerId)
           .Include(i => i.Items)
           .ThenInclude(p => p.Product)
           .FirstOrDefaultAsync();

            return basket;
        }
    }
}