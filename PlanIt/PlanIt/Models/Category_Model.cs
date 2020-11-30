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
        [Key]
        public string Category_Id { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
        public List<Entry_Model> Entries { get; set; }

        public string Calendar_Id { get; set; }

        [ForeignKey("Calender_Id")]
        public Calendar_Model Calendar { get; set; }

    }
}
