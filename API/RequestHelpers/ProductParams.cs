namespace API.RequestHelpers
{
    public class ProductsParams : PaginationParams
    {
        public string? orderBy { get; set; }
        public string? searchTerm { get; set; }
        public string? brands { get; set; }
        public string? types { get; set; }

    }
}