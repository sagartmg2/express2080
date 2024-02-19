let matched = false;
let todos = ["html", "css","html"]; // [ {id:1,name:"html"},{id:2,name:"css"}  ]
let inputTitle = "html";

/* code here ....  */
// for (let index = 0; index < todos.length; index++) {
//     if(todos[index] == inputTitle){
//         matched = true
//     }
// }

// todos.forEach((el) => {
//   if (el == inputTitle) {
//     matched = true;
//   }
// });

let output  = todos.some(el => el == inputTitle)
console.log("output",output);

console.log(matched); // output: true

/* no sql  */

let classes = [
    {
        grade:1,
        sections:[
            {
                name:"A",
                classTeacher:"abc",
                students:[
                    {
                        name:"ram",
                        age:11,
                    }
                ]
            }
        ]
    }
]
