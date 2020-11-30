using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class Category_Model
    {
        public Category_Model()
        {
            this.Category_Id = "0";
            this.Title = "0";
            this.Events = new List<Event_Model>();
            this.Color = "0";
            this.Calendar_Id = "0";
        }

        [Key]
        public string Category_Id { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public List<Event_Model> Events { get; set; }

        [ForeignKey("Calender_Model")]
        public string Calendar_Id { get; set; }
        public virtual Calendar_Model Calendar { get; set; }
    }
}
