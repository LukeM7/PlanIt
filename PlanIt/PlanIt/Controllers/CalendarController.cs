﻿using System;
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
using System.Text.Json;

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
        /*
        private User_Model Find_User(string user_id)
        {
            foreach (var i in db.User)
            {
                if (i.User_Id == user_id)
                {
                    return i;
                }
            }

            return null;
        }
        */
        private Calendar_Model Find_Calendar(string cal_id)
        {
            foreach(var cal in db.Calendar)
            {
                if (cal.Calendar_Id == cal_id) return cal;
            }

            return null;
        }

        private Category_Model Find_Category(string cat_id)
        {
            foreach (var ctg in db.Category)
            {
                if (ctg.Category_Id == cat_id) return ctg;
            }

            return null;
        }

        private Event_Model Find_Event (string evt_id)
        {
            foreach(var evnt in db.Event)
            {
                if (evnt.Event_Id == evt_id) return evnt;
            }
            return null;
        }

        public static CalendarViewModel calVM = new CalendarViewModel();
        
        //GET: Calendar
        public IActionResult Index()
        {
            return View(calVM);
        }

        public IActionResult ConstructCalendar()
        {
            Calendar_Model cal = Find_Calendar(TempData["calendar"].ToString());
            calVM.userCalendar = cal;
            return RedirectToAction("Index");
        }

        [HttpGet]
        public JsonResult GetModelJSON()
        {
            return Json(calVM.userCalendar.ToJson());
        }


        [HttpPost]
        public JsonResult ToggleCategory(
            string ctg_id,
            int ctg_index)
        {
            Console.WriteLine("category toggled, index: " + ctg_index.ToString());
            calVM.userCalendar.Categories[ctg_index].isToggled = !calVM.userCalendar.Categories[ctg_index].isToggled;
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult ToggleAllCategories(bool toggleValue)
        {

            foreach (Category_Model category in calVM.userCalendar.Categories)
            {
                category.isToggled = toggleValue;
            }
            //db.Update(calVM.userCalendar);
            //db.SaveChanges();
            //calVM.ToggleAllCategoriesChecker = !toggleValue;
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult EditCategory(
            string ctg_id,
            int ctg_index,
            string ctgTitle,
            string ctgColor)
        {

            //call update to database on category with particluar id and write the values...
            Category_Model ctg = calVM.userCalendar.Categories[ctg_index];
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
            Console.WriteLine(ctg.Title);
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
            //db.Add(calVM.userCalendar);
            //db.SaveChanges();
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult DeleteCategory(
            string ctg_id,
            int ctg_index)
        {
            //call update to database to delete the category given its id...
            //Category_Model tbd_category = Find_Category(ctg_id);
            calVM.userCalendar.Categories.RemoveAt(ctg_index);
            //try
            //{
            //    Calendar_Model cal = Find_Calendar(tbd_category.Calendar_Id);
            //    cal.Categories.Remove(tbd_category);
            //    db.Remove(tbd_category);
            //}
            //catch (NullReferenceException e)
            //{
            //    Console.WriteLine("Attempted to delete null category: " + e.Message);
            //    throw;
            //}
            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult EditEvent(
            //string ctg_id, for adding to a new category
            string evt_id,
            int evt_index,
            int ctg_index,
            int newCtg_index,
            string evtTitle,
            string evtStartDate,
            float evtDuration,
            float evtStartTime, //convert to float in EditEvent function
            string evtDescription)
        {
            if (ctg_index != newCtg_index)
            {
                Console.WriteLine("Moved " + evtTitle + " to different category");
                calVM.userCalendar.Categories[ctg_index].Events.RemoveAt(evt_index);
                var newEvent = new Event_Model(evtTitle, evtStartDate, evtStartTime, evtDuration, evtDescription);
                calVM.userCalendar.Categories[newCtg_index].Events.Add(newEvent);
            }
            else
            {
                Console.WriteLine("Edited " + evtTitle + " but same category");
                var evt = calVM.userCalendar.Categories[ctg_index].Events[evt_index];
                evt.Title = evtTitle;
                evt.StartDate = evtStartDate;
                evt.Duration = evtDuration;
                evt.StartTime = evtStartTime;
                evt.Description = evtDescription;
            }

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
            int ctg_index,
            string evtTitle,
            string evtStartDate,
            float evtStartTime, //convert to float in EditEvent function
            float evtDuration,
            string evtDescription)
        {
            Console.WriteLine("addEvent called with ctg_index: " + ctg_index);
            var newEvent = new Event_Model(evtTitle, evtStartDate, evtStartTime, evtDuration, evtDescription);
            //figure out which category this event should go into


            calVM.userCalendar.Categories[ctg_index].Events.Add(newEvent);

            //call update to database to construct new event...
            //db.Update(newEvent);

            return Json(calVM.userCalendar.ToJson());
        }

        [HttpPost]
        public JsonResult DeleteEvent(
            int ctg_index,
            string evt_id,
            int evt_index)
        {
            Console.WriteLine("delete event for event at index: " + evt_index.ToString());
            calVM.userCalendar.Categories[ctg_index].Events.RemoveAt(evt_index);
            //    //call update to database to delete the event given its id...
            //    Event_Model tbd_event = Find_Event(evt_id);
            //    try
            //    {
            //        db.Remove(tbd_event);
            //    }
            //    catch (NullReferenceException e)
            //    {
            //        Console.WriteLine("Attempted to delete a null event from database: " + e.Message);
            //        throw;
            //    }
            //    db.SaveChanges();
            return Json(calVM.userCalendar.ToJson());
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
