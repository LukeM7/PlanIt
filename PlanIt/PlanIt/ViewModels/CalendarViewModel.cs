using System;
using System.Collections.Generic;
using System.Text.Json;
using PlanIt.Models;


namespace PlanIt.ViewModels
{
    public class CalendarViewModel
    {
        public Calendar_Model userCalendar;
                

        public bool ToggleAllCategoriesChecker = true;

        public CalendarViewModel()
        {
            userCalendar = new Calendar_Model();
        }

        public string ToJson()
        {
            Console.WriteLine("serialization being called");
            Console.WriteLine(JsonSerializer.Serialize(this));
            return JsonSerializer.Serialize(this);
        }
    }
}