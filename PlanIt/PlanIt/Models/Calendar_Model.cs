using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanIt.Models
{
    public class Calendar_Model
    {

        public Calendar_Model()
        {
            this.Calendar_Id = "0";
            this.User_Id = "0";
            this.Categories = new List<Category_Model>();
        }


        [Key]
        public string Calendar_Id { get; set; }

        [ForeignKey("User_Model")]
        public string User_Id { get; set; }

        public List<Category_Model> Categories { get; set; }
    }
}
