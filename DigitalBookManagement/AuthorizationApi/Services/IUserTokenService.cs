using AuthorizationApi.Models;

namespace AuthorizationApi.Services
{
    public interface IUserTokenService
    {
        public string BuildToken(string key, string issuer, IEnumerable<string> audience,List<UserDetails> userDetails);
        public  List<UserDetails> UserValidation(string username, string password);
    }
}