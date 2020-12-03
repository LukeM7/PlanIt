﻿using System;
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
using PlanIt.ViewModels;
using PlanIt.Models;


namespace PlanIt.Controllers
{
    public class CalendarController : Controller
    {
        
        private readonly ApplicationDbContext db;
        private readonly ILogger<CalendarController> _logger;

        public CalendarController(ILogger<CalendarController> logger, ApplicationDbContext db)
        {
            _logger = logger;
            this.db = db;
        }


        public static CalendarViewModel calVM = new CalendarViewModel();
        //GET: Calendar
        public IActionResult Index()
        {
            //build user's calendar by pulling from database
            Console.WriteLine("index called");
            return View(calVM);
            /*Calendar_Model calendar;
            foreach(var i in db.Calendar)
            {
                if(i.User_Id == )
            }*/
        }
        
        [HttpPost]
        public void Test(string data, int index)
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
            Console.WriteLine("toggling " + calVM.userCalendar.Categories[index].Title + " off of " + calVM.userCalendar.Categories[index].isToggled.ToString());
            calVM.userCalendar.Categories[index].isToggled = !calVM.userCalendar.Categories[index].isToggled;
            Console.WriteLine("now " + calVM.userCalendar.Categories[index].isToggled.ToString());
            return RedirectToAction("Index");
        }
        public IActionResult ToggleAllCategories(bool toggleValue)
        {

            foreach (Category_Model category in calVM.userCalendar.Categories)
            {
                category.isToggled = toggleValue;
            }
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
