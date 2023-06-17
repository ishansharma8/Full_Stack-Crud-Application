using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Emp_crud_be.Models
{
    public class Employee
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Age { get; set; }
        public int IsActive { get; set; }


    }
}
