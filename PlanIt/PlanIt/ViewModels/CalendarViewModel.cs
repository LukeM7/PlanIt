using System;
using System.Collections.Generic;
using System.Text.Json;
using PlanIt.Models;


namespace PlanIt.ViewModels
{
    public class CalendarViewModel
    {
        public Calendar_Model userCalendar =
            new Calendar_Model(new List<Category_Model>() {
                new Category_Model("General", "#bc665c", true, new List<Event_Model>()
                    { new Event_Model("general0", "2020-12-03", 12f, 4f, "stuff"),
                      new Event_Model("general1", "2020-12-03", 6f, 1f, ""),
                      new Event_Model("general2", "2020-12-03", 16f, 5f, ""),
                      new Event_Model("general3", "2020-12-03", 10f, 3f, ""),
                    }),
                new Category_Model("School", "#e3874a", false, new List<Event_Model>()
                    { new Event_Model("school4", "2020-12-03", 18.75f, 2f, ""),
                      new Event_Model("school5", "2020-12-03", 20f, 3f, ""),
                      new Event_Model("school6", "2020-12-03", 3f, 2.5f, ""),
                      new Event_Model("school7", "2020-12-03", 8f, 1.5f, ""),
                    }),
                new Category_Model("Work", "#f0d05c", false, new List<Event_Model>()
                    { new Event_Model("work8", "2020-12-03", 7f, 3f, ""),
                      new Event_Model("work9", "2020-12-03", 9f, 2f, ""),
                      new Event_Model("work10", "2020-12-03", 13f, 0.5f, ""),
                      new Event_Model("work11", "2020-12-03", 15f, 2f, ""),
                    }),
                new Category_Model("Soccer", "#74b2e2", true, new List<Event_Model>()
                    { new Event_Model("soccer12", "2020-12-03", 8f, 3f, ""),
                      new Event_Model("soccer13", "2020-12-03", 2f, 2f, ""),}
                    ),
                new Category_Model("PT", "#86c6b9", true, new List<Event_Model>()
                    { new Event_Model("PT", "2020-12-03", 18f, 2f, ""),
                      new Event_Model("PT", "2020-12-03", 20f, 3f, ""),
                      new Event_Model("PT", "2020-12-03", 3f, 2.5f, ""),
                      new Event_Model("PT", "2020-12-03", 8f, 1.5f, ""),}
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

        public bool ToggleAllCategoriesChecker = true;

        public string ToJson()
        {
            Console.WriteLine("serialization being called");
            Console.WriteLine(JsonSerializer.Serialize(this));
            return JsonSerializer.Serialize(this);
        }
    }
}