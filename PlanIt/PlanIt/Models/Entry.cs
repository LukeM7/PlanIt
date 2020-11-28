using System;

namespace PlanIt.Models
{
    public class Entry
    {
        public string DueDate { get; set; }
        public bool isComplete { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
    }
}
