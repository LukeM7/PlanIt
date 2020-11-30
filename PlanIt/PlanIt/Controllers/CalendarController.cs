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
            //declare data
            //data can be accessed by front end view
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult Create_Event(FormCollection form)
        {
            StringBuilder view_data = new StringBuilder();
            Event_Model new_event = new Event_Model();
            new_event.Event_Id = form["Event ID"];
            new_event.Title = form["Title"];
            new_event.At_Time = form["At Time"];

            return View(view_data);
        }
    }
}
