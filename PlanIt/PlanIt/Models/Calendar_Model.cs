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
        [Key]
        public string Calendar_Id { get; set; }

        public List<Category_Model> Categories { get; set; }

        [ForeignKey("User_Model")]
        public string User_Id { get; set; }
        public virtual User_Model User { get; set; }

    }

}
