using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlanIt.Models;

namespace PlanIt.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category_Model> Category{ get; set; }
        public DbSet<Checklist_Model> Checklist { get; set; }
        public DbSet<User_Model> User { get; set; }


    }
}
