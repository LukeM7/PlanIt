﻿using System;
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
            Guid new_id = new Guid();
            this.Event_Id = new_id.ToString();
            this.Title = "0";
            this.StartDate = "0";
            this.StartTime = 0;
            this.Duration = 0;
            this.Description = "";
        }

        public Event_Model(string t, string sd, float st, float dur, string desc)
        {
            Guid new_id = new Guid();
            this.Event_Id = new_id.ToString();
            this.Title = t;
            this.StartDate = sd;
            this.StartTime = st;
            this.Duration = dur;
            this.Description = desc;
        }

        [Key]
        public string Event_Id { get; set; }
        
        public string Title { get; set; }

        public string StartDate { get; set; }

        public float StartTime { get; set; }

        [DataType(DataType.Time)]
        public float Duration { get; set; }

        public string Description { get; set; }
        
        public virtual string Category_Id { get; set; }
        [ForeignKey("Category_Id")]
        public virtual Category_Model Category { get; set; }

    }
}
