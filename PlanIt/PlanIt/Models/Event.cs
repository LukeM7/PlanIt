using System;

namespace PlanIt.Models
{
    public class Event
    {
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public float Duration { get; set; }
        public string Description { get; set; }

        //this has to be a pointer to a single parent category:
        //public Category* ParentCategory { get; set; }
        //instead of:
        //public string Category { get; set; }
        //though this won't compile in its current state
    }
}
