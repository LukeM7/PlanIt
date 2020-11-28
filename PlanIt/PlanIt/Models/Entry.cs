using System;

namespace PlanIt.Models
{
    public class Entry
    {
        public string Title { get; set; }
        public bool isComplete { get; set; }
        public string Text { get; set; }
        //this has to be a pointer to a single parent category:
        //public unsafe Category* ParentCategory { get; set; }
        //instead of:
        //public string Category { get; set; }
        //same thing for any referenced events:
        //public unsafe [Event]* ConnectedEvents {get; set}
        //though these won't compile in their current state
    }
}
