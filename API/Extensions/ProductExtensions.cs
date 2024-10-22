using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {

            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string search)
        {
            if (string.IsNullOrWhiteSpace(search)) return query;

            return query.Where(p => p.Name.Trim().ToLower().Contains(search.Trim().ToLower()));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (brands != null)
                brandList.AddRange(brands.ToLower().Split(',').ToList());
            if (types != null)
                typeList.AddRange(types.ToLower().Split(',').ToList());

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type));

            return query;
        }
    }
}