using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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

        public IActionResult Index()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        /*
        [HttpPost]
        public IActionResult Create_Event(FormCollection form)
        {
            Event_Model new_event = new Event_Model();
            new_event.Event_Id = form["Event ID"];
            new_event.Title = form["Title"];
            new_event.At_Time = form["At Time"];
            new_event.Duration = form["Duration"];
            new_event.Date = form["Date"];

            StringBuilder view_data = new StringBuilder();
            view_data.Append("<b>Event ID :</b>" + new_event.Event_Id + "<br/>");
            view_data.Append("<b>Title :</b>" + new_event.Title + "<br/>");
            view_data.Append("<b>At Time :</b>" + new_event.At_Time + "<br/>");
            view_data.Append("<b>Duration :</b>" + new_event.Duration + "<br/>");
            view_data.Append("<b>Date :</b>" + new_event.Date + "<br/>");
            
            return Content(view_data.ToString());
        }
        */
    }
}
