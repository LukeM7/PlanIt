﻿using System;
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
            var new_id = Guid.NewGuid();
            this.Category_Id = new_id.ToString();
            this.Title = "0";
            this.Color = "0";
            this.isToggled = true;
            this.Events = new List<Event_Model>();
        
        }
        public Category_Model(string t, string c, bool toggle, List<Event_Model> evts)
        {
            var new_id = Guid.NewGuid();
            this.Category_Id = new_id.ToString();
            this.Title = t;
            this.Color = c;
            this.isToggled = toggle;
            this.Events = evts;
        }

        [Key]
        public string Category_Id { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public bool isToggled { get; set; }
        public List<Event_Model> Events { get; set; }

        
        public virtual string Calendar_Id { get; set; }
        [ForeignKey("Calender_Id")]
        public virtual Calendar_Model Calendar { get; set; }
    }
}