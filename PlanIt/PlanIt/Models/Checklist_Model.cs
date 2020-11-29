﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class Checklist_Model
    {
        [Key]
        public string Checklist_Id { get; set; }
        public string Title { get; set; }
        public string Category_Id { get; set; }
        public string User_Id { get; set; }

    }
}
