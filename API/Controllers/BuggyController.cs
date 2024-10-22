using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {
        [HttpGet("Not-Found")]
        public IActionResult NotFound()
        {
            return NotFound();
        }

        [HttpGet("Bad-Request")]
        public IActionResult BadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("Unauthorized-user")]
        public IActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("Validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem", "This is 1st");
            ModelState.AddModelError("Problem", "This is 1st");
            return ValidationProblem();
        }

        [HttpGet("Server-error")]

        public IActionResult GetServerError()
        {
            throw new Exception("Server error occured");
        }

    }
}