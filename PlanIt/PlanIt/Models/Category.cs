using System;
using System.Collections.Generic;
namespace PlanIt.Models

{
    public class Category
    {
        public String Title { get; set; }
        public String Color { get; set; }
        public List<Event> Events { get; set; }

    }
}