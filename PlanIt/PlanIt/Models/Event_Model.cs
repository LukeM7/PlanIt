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
        [Key]
        public string Event_Id { get; set; }
        
        [DataType(DataType.Date)]
        public string Date { get; set; }
        public string Title { get; set; }

        [DataType(DataType.DateTime)]
        public string At_Time { get; set; }

        [DataType(DataType.Time)]
        public string Duration { get; set; }


        public string Category_Id { get; set; }

        [ForeignKey("Category_Id")]
        public Category_Model Category { get; set; }


        public string Entry_Id { get; set; }

        [ForeignKey("Entry_Id")]
        public Entry_Model Entry { get; set; }

    }
}
