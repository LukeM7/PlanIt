using Microsoft.AspNetCore.Mvc;
using PlanIt.Data;
using PlanIt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Controllers
{
    public class Category_Controller : Controller
    {
        private readonly ApplicationDbContext db;
        public Category_Controller(ApplicationDbContext db)
        {
            this.db = db;

        }

        public IActionResult Index()
        {
            Calendar_Model calendar = new Calendar_Model();
            db.Add(calendar);
            db.SaveChanges();
            return View();
        }
    }
}
