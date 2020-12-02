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

        public Calendar_Model userCalendar = new Calendar_Model(new List<Category_Model>()
                {
                new Category_Model("General", "#bc665c", true, new List<Event_Model>()
                    { new Event_Model("general0", "2020-12-2", 12f, 4f),
                      new Event_Model("general1", "2020-12-2", 6f, 1f),
                      new Event_Model("general2", "2020-12-2", 16f, 5f),
                      new Event_Model("general3", "2020-12-2", 10f, 3f),
                    }),
                new Category_Model("School", "#e3874a", false, new List<Event_Model>()
                    { new Event_Model("school4", "2020-12-2", 18f, 2f),
                      new Event_Model("school5", "2020-12-2", 20f, 3f),
                      new Event_Model("school6", "2020-12-2", 3f, 2.5f),
                      new Event_Model("school7", "2020-12-2", 8f, 1.5f),
                    }),
                new Category_Model("Work", "#f0d05c", false, new List<Event_Model>()
                    { new Event_Model("work8", "2020-12-2", 7f, 3f),
                      new Event_Model("work9", "2020-12-2", 9f, 2f),
                      new Event_Model("work10", "2020-12-2", 13f, 0.5f),
                      new Event_Model("work11", "2020-12-2", 15f, 2f),
                    }),
                new Category_Model("Soccer", "#74b2e2", true, new List<Event_Model>()
                    { new Event_Model("soccer12", "2020-12-2", 8f, 7f),
                      new Event_Model("soccer13", "2020-12-2", 2f, 2f),}
                    ),
                new Category_Model("PT", "#86c6b9", true, new List<Event_Model>()
                    { }
                    ),
                new Category_Model("Chores", "#869ec6", true, new List<Event_Model>()
                    { }
                    ),
                new Category_Model("Dates", "#8a86c6", true, new List<Event_Model>()
                    { }
                    ),
                new Category_Model("Other Docs", "#cb80bf", true, new List<Event_Model>()
                    { }
                    )
                }
            );

        //GET: Calendar
        public IActionResult Index()
        {
            //build user's calendar by pulling from database
            Console.WriteLine("index called");
            return View(userCalendar);
        }

        [HttpPost]
        public void Test(string data)
        {
            Console.WriteLine("output from test with msg: " + data);
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
        public IActionResult ToggleCategory(string id, int index)
        {
            Console.WriteLine("ToggleCategory: " + id);
            Console.WriteLine("ToggleCategory: " + index.ToString());
            userCalendar.Categories[index].isToggled = !userCalendar.Categories[index].isToggled;

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
