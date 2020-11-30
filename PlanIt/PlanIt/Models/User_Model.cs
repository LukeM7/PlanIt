﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class User_Model
    {
        public User_Model()
        {
            this.User_Id = "0";
            this.Name = "Test";
            this.Email = "0";
            this.Phone_Number = "0";
            this.Password = "0";
        }

        [Key]
        public string User_Id { get; set; }
        public string Name { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone_Number { get; set; }

        public string Password { get; set; }
    }
}
