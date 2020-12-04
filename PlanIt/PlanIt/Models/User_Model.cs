using System;
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
            var new_id = Guid.NewGuid();
            this.User_Id = new_id.ToString();
            this.Name = "Test";
            this.Email = "0";
            this.Phone_Number = "0";
            this.Password = "0";
            this.Calendar = new Calendar_Model();
        }

        [Key]
        public string User_Id { get; set; }
        public string Name { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone_Number { get; set; }

        public string Password { get; set; }

        public Calendar_Model Calendar { get; set; }
    }
}
