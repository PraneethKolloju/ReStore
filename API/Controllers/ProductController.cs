using System.Diagnostics;
using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductsParams? productsParams)
        {
            var query = _context.Products
            .Sort(productsParams.orderBy)
            .Search(productsParams.searchTerm)
            .Filter(productsParams.brands, productsParams.types)
            .AsQueryable();

            var products =
                await PagedList<Product>.ToPagedList(query, productsParams.PageNumber, productsParams.PageSize);
            Response.AddPaginationHeader(products.Metadata);
            // Debug.Print("Indegun con", products.Metadata.ToString());
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetBrandsTypes()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var typeList = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { brands, typeList });
        }
    }
}