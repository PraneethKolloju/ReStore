using API.Entities;

namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
    }
}