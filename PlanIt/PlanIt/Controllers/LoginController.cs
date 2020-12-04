using Microsoft.AspNetCore.Mvc;
using PlanIt.Data;
using PlanIt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Controllers
{
    public class LoginController : Controller
    {
        private readonly ApplicationDbContext db;

        public LoginController(ApplicationDbContext db)
        {
            this.db = db;
        }
        private User_Model Find_User(string name, string password)
        {
            foreach (var i in db.User)
            {
                if (i.Name == name && i.Password == password) return i;
            }

            return null;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public IActionResult Authenticate(string username, string password)
        {
            User_Model user = Find_User(username, password);
            try
            {
                if(user != null)
                {
                    return RedirectToAction("Index", "Calendar");
                }
            }
            catch (NullReferenceException e)
            {
                Console.WriteLine("Null User: " + e.Message);
                throw;
            }
            return RedirectToAction("Index");
        }
    }
}
