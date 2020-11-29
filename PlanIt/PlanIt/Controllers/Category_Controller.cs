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
        private readonly ApplicationDbContext _db;
        public Category_Controller(ApplicationDbContext db)
        {
            _db = db;

        }

        public IActionResult Index()
        {
            IEnumerable<Category_Model> obj_list = _db.Category;
            return View(obj_list);
        }
    }
}
