using System;

namespace PlanIt.Models
{
    public class Entry
    {
        public string DueDate { get; set; }
        public bool isComplete { get; set; }
        public string Title { get; set; }
        //this has to be a pointer to a single parent category:
        //public Category* ParentCategory { get; set; }
        //instead of:
        //public string Category { get; set; }
    }
}
