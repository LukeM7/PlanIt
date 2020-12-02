using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace PlanIt.Models
{
    public class Calendar_Model
    {
        public Calendar_Model()
        {
            var new_id = Guid.NewGuid();
            this.Calendar_Id = new_id.ToString();
            this.Categories = new List<Category_Model>();
        }
        public Calendar_Model(List<Category_Model> ctgs)
        {
            var new_id = Guid.NewGuid();
            this.Calendar_Id = new_id.ToString();
            this.Categories = ctgs;
        }

        [Key]
        public string Calendar_Id { get; set; }

        public List<Category_Model> Categories { get; set; }

        /*
        public virtual string User_Id { get; set; }
        [ForeignKey("User_Id")]
        public virtual User_Model User { get; set; }
        */

        public string ToJson()
        {
            Console.WriteLine("serialization being called");
            Console.WriteLine(JsonSerializer.Serialize(this));
            return JsonSerializer.Serialize(this);
        }
    }
}