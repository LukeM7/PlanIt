using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private Calendar_Model Find_Calendar(string name, string password)
        {
            foreach (var i in db.Calendar)
            {
                if (i.username == name && i.password == password)
                {
                    return i;
                }
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
            Calendar_Model cal = Find_Calendar(username, password);
            if(cal != null)
            {
                TempData["calendar"] = cal.Calendar_Id;
                return RedirectToAction("ConstructCalendar", "Calendar");
            };
            cal = new Calendar_Model();
            TempData["calendar"] = cal.Calendar_Id;
            db.Add(cal);
            db.SaveChanges();
            return RedirectToAction("ConstructCalendar", "Calendar");
        }
    }
}
