using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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

        private Calendar_Model Find_Calendar(string cal_id)
        {
            foreach(var i in db.Calendar)
            {
                if (i.Calendar_Id == cal_id) return i;
            }

            return null;
        }

        private Category_Model Find_Category(string cat_id)
        {
            foreach (var i in db.Category)
            {
                if (i.Category_Id == cat_id) return i;
            }

            return null;
        }

        private Event_Model Find_Event (string evt_id)
        {
            foreach(var evnt in db.Event)
            {
                if (i.Event_Id == evt_id) return evnt;
            }
            return null;
        }

        public static CalendarViewModel calVM = new CalendarViewModel();
        
        //GET: Calendar
        public IActionResult Index()
        {
            User_Model user = new User_Model();
            user.Calendars.Add(new Calendar_Model());
            user.Calendars[0].Categories.Add(new Category_Model() { Title = "Test", Color = "#bc665c" });
            CalendarViewModel viewModel = new CalendarViewModel() { userCalendar = user.Calendars[0] };
            //build user's calendar by pulling from database
            
            
            return View(calVM);


            /*Calendar_Model calendar;
            foreach(var i in db.Calendar)
            {
                if(i.User_Id == )
            }*/

            //Console.WriteLine("index called");
            //return View(viewModel);
        }

        [HttpGet]
        public JsonResult GetModelJSON()
        {
            return Json(calVM.userCalendar.ToJson());
        }


        [HttpPost]
        public JsonResult ToggleCategory(
            string ctg_id,
            int index)
        {
            calVM.userCalendar.Categories[index].isToggled = !calVM.userCalendar.Categories[index].isToggled;
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult ToggleAllCategories(bool toggleValue)
        {

            foreach (Category_Model category in calVM.userCalendar.Categories)
            {
                category.isToggled = toggleValue;
            }
            //calVM.ToggleAllCategoriesChecker = !toggleValue;
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult EditCategory(
            string ctg_id,
            int index,
            string ctgTitle,
            string ctgColor)
        {

            //call update to database on category with particluar id and write the values...
            Category_Model ctg = calVM.userCalendar.Categories[index];
            ctg.Color = ctgColor;
            ctg.Title = ctgTitle;

            //try
            //{
            //    db.Update(fetched_category);
            //}
            //catch (NullReferenceException e)
            //{
            //    Console.WriteLine("Null reference error when attempting to edit category: " + e.Message);
            //    throw;
            //}
            //db.SaveChanges();

            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult AddCategory(
            string ctgTitle,
            string ctgColor)
        {
            var ctg = new Category_Model(ctgTitle, ctgColor, true, new List<Event_Model>());
            calVM.userCalendar.Categories.Add(ctg);
            //call update to database to construct brand new category...
            //calVM.userCalendar.Calendar_Id = Find_Calendar(ctg.Calendar_Id);

            //try
            //{
            //    cal.Categories.Add(ctg);
            //    db.Update(cal);
            //}
            //catch (NullReferenceException e)
            //{
            //    Console.WriteLine("Attempted to add a null category: " + e.Message);
            //    throw;
            //}
            //db.SaveChanges();

            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult DeleteCategory(
            string ctg_id,
            int index)
        {
            //call update to database to delete the category given its id...
            Category_Model tbd_category = Find_Category(ctg_id);
            calVM.userCalendar.Categories.RemoveAt(index);
            try
            {
                Calendar_Model cal = Find_Calendar(tbd_category.Calendar_Id);
                cal.Categories.Remove(tbd_category);
                db.Remove(tbd_category);
            }
            catch (NullReferenceException e)
            {
                Console.WriteLine("Attempted to delete null category: " + e.Message);
                throw;
            }
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult EditEvent(
            //string ctg_id, for adding to a new category
            string evt_id,
            string evtTitle,
            string evtStartDate,
            string evtDuration, //convert to float in EditEvent function
            string evtStartTime, //convert to float in EditEvent function
            string evtDescription)
        {
            //somehow figure out which category this event should go into
            //find category
            // var evt calVM.userCalendar.Categories[figure this out].Events[index];

            //try
            //{
            //    db.Update(evt);
            //}
            //catch (NullReferenceException e)
            //{
            //    Console.WriteLine("Attempted to modify a null event: " + e.Message);
            //    throw;
            //}
            //call update to database on event with particular id and write the values...

            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult AddEvent(
            string ctg_id,
            string evtTitle,
            string evtStartDate,
            float evtDuration,
            float evtStartTime,
            string evtDescription)
        {
            var newEvent = new Event_Model(evtTitle, evtStartDate, evtStartTime, evtDuration, evtDescription);
            //figure out which category this event should go into

            //call update to database to construct new event...
            db.Update(evt);


            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public ActionResult DeleteEvent(
            string evt_id,
            string evtTitle,
            string evtStartDate,
            float evtDuration,
            float evtStartTime,
            string evtDescription)
        {
            //call update to database to delete the event given its id...
            Event_Model tbd_event = Find_Event(evt_id);
            try
            {
                db.Remove(tbd_event);
            }
            catch (NullReferenceException e)
            {
                Console.WriteLine("Attempted to delete a null event from database: " + e.Message);
                throw;
            }
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
