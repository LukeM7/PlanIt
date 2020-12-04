using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Html;
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
            this.Categories.Add(new Category_Model() { Title = "General", Color = "#bc665c" });
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

 
        public virtual string User_Id { get; set; }
        [ForeignKey("User_Id")]
        public virtual User_Model User { get; set; }
        
        public string ToJson()
        {
            Console.WriteLine("calendar serialization called");
            return JsonSerializer.Serialize(this);
        }
        public HtmlString ToJsonHtmlString()
        {
            return new HtmlString(this.ToJson());
        }

    }
}