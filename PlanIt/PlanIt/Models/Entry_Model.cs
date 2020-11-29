using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class Entry_Model
    {
        [Key]
        public string Entry_Id { get; set; }
        public string Title { get; set; }

        public string Checklist_Id { get; set; }

        [ForeignKey("Checklist_Id")]
        public Checklist_Model Checklist { get; set; }
        public string Event_Id { get; set; }

        [ForeignKey("Event_Id")]
        public Event_Model Event { get; set; }


    }
}
