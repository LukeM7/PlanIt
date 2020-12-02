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

        private string Seed()
        {
            Calendar_Model calendar = new Calendar_Model();
            db.Add(calendar);
            calendar.Categories.Add(new Category_Model() { Title = "Test0" });
            calendar.Categories.Add(new Category_Model() { Title = "Test1" });
            db.SaveChanges();
            return calendar.Calendar_Id;
        }

        public IActionResult Index()
        {
            //Add Testing
            /*
            Calendar_Model calendar = new Calendar_Model();
            db.Add(calendar);
            calendar.Categories.Add(new Category_Model());
            calendar.Categories.Add(new Category_Model());
            db.SaveChanges();
            Calendar_Model new_calendar = new Calendar_Model();
            db.Add(new_calendar);
            new_calendar.Categories.Add(new Category_Model());
            db.SaveChanges();
            */
            //Edit Testing
            /*
            var cal_id = Seed();
            IEnumerable<Calendar_Model> list = db.Get_Calendars();
            foreach(var i in list)
            {
                if (i.Calendar_Id.Equals(cal_id))
                {
                    i.Categories[0].Title = "Teddy";
                    db.Update(i);
                }
            }
            db.SaveChanges();
            */
            //Read Testing
            //DB must have entries already in it
            
            Seed();
            Category_Model test;
            foreach(var i in db.Category){
                if(i.Title == "Daniel")
                {
                    test = i;
                }
            }
            
            return View();
        }
    }
}
