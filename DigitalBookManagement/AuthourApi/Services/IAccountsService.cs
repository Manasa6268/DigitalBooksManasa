using AuthourApi.Model;

namespace AuthourApi.Services
{
    public interface IAccountsService
    {
        string checkaccount(UserLoginData userLoginData);
        string CreateAccount(UserDetails userDetails);
        List<UserDetails> ValidateAccount(string? userName, string? password);
    }
}