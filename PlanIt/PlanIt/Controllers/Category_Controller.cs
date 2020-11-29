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
            IEnumerable<Category_Model> obj_list = db.Category;
            return View(obj_list);
        }
    }
}
