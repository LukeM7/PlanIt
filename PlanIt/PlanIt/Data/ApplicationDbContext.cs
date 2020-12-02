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
        public DbSet<User_Model> User { get; set; }
        public DbSet<Calendar_Model> Calendar { get; set; }
        public DbSet<Event_Model> Event { get; set; }

        public IEnumerable<Category_Model> Get_Categories()
        {
            return Category;
        }
        public IEnumerable<User_Model> Get_Users()
        {
            return User;
        }
        public IEnumerable<Calendar_Model> Get_Calendars()
        {
            return Calendar;
        }
        public IEnumerable<Event_Model> Get_Events()
        {
            return Event;
        }
    }
}