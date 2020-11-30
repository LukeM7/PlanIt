using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class Event_Model
    {
        public Event_Model()
        {
            this.Event_Id = "0";
            this.Date = "0";
            this.Title = "0";
            this.At_Time = "0";
            this.Duration = "0";
            this.Category_Id = "0";
        }

        [Key]
        public string Event_Id { get; set; }
        
        [DataType(DataType.Date)]
        public string Date { get; set; }
        public string Title { get; set; }

        [DataType(DataType.DateTime)]
        public string At_Time { get; set; }

        [DataType(DataType.Time)]
        public string Duration { get; set; }

        [ForeignKey("Category_Model")]
        public string Category_Id { get; set; }
        public virtual Category_Model Category { get; set; }



        /*
        public string Entry_Id { get; set; }

        [ForeignKey("Entry_Id")]
        public Entry_Model Entry { get; set; }
        */
    }
}
