using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlanIt.Data;
using PlanIt.Models;


namespace PlanIt.Controllers
{
    public class CalendarController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<CalendarController> _logger;

        public CalendarController(ILogger<CalendarController> logger, ApplicationDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        //GET: Calendar
        public IActionResult Index()
        {
            //build user's calendar by pulling from database

            var userCalendar = new Calendar_Model(new List<Category_Model>()
                {
                new Category_Model("General", "#bc665c", true, new List<Event_Model>()
                    { new Event_Model("general1", "2020-12-2", 12f, 4f),
                      new Event_Model("general2", "2020-12-2", 6f, 1f),
                      new Event_Model("general3", "2020-12-2", 16f, 5f),
                      new Event_Model("general4", "2020-12-2", 10f, 3f),
                    }),
                new Category_Model("School", "#e3874a", true, new List<Event_Model>()
                    { new Event_Model("school1", "2020-12-2", 18f, 2f),
                      new Event_Model("school2", "2020-12-2", 20f, 3f),
                      new Event_Model("school3", "2020-12-2", 3f, 2.5f),
                      new Event_Model("school4", "2020-12-2", 8f, 1.5f),
                    }),
                new Category_Model("Work", "#bc665c", true, new List<Event_Model>()
                    { new Event_Model("work1", "2020-12-2", 7f, 3f),
                      new Event_Model("work2", "2020-12-2", 9f, 2f),
                      new Event_Model("work3", "2020-12-2", 13f, 0.5f),
                      new Event_Model("work4", "2020-12-2", 15f, 2f),
                    }),
                new Category_Model("Soccer", "#e3874a", true, new List<Event_Model>()
                    { new Event_Model("soccer1", "2020-12-2", 12f, 2f),
                      new Event_Model("soccer2", "2020-12-2", 22f, 2f),
                      new Event_Model("soccer3", "2020-12-2", 5f, 2.5f),
                      new Event_Model("soccer4", "2020-12-2", 17f, 1.5f),
                    })
                }
            );
            return View(userCalendar);
        }

        public void Test()
        {
            Console.WriteLine("output from test");
        }

        [HttpPost]
        public ActionResult EditCategory(Category_Model ctg)
        {
            var title = ctg.Title;
            var color = ctg.Color;
            //call update to database on category with particluar id and write the values...

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult AddCategory(Category_Model ctg)
        {
            var title = ctg.Title;
            var color = ctg.Color;
            //call update to database to construct brand new category...

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult DeleteCategory(string ctg_id)
        {
            //call update to database to delete the category given its id...

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult EditEvent(Event_Model evt)
        {
            var title = evt.Title;
            var startTime = evt.StartTime;
            var duration = evt.Duration;

            //call update to database on event with particular id and write the values...


            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult AddEvent(Event_Model evt)
        {
            var title = evt.Title;
            var startTime = evt.StartTime;
            var duration = evt.Duration;

            //call update to database to construct new event...
            _db.Add(evt);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult DeleteEvent(string evt_id)
        {
            //call update to database to delete the event given its id...

            return RedirectToAction("Index");
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
