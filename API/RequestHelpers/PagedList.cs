using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{

    public class PagedList<T> : List<T>
    {

        public MetaData Metadata { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int PageSize)
        {
            Metadata = new MetaData
            {
                TotalCount = count,
                PageSize = PageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)PageSize)
            };

            AddRange(items);
        }


        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,
        int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();

            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);

        }

    }
}