let addBtn =document.getElementById("add");
let input = document.getElementById("title");
let textArea =document.getElementById("desc");
let listTask  = document.getElementById("list");
let timeTask = document.getElementById("timeTask")

let arrayTask = [];
if(localStorage.getItem("tasks")){
    arrayTask = JSON.parse(localStorage.getItem("tasks"));
}
getData();
addBtn.addEventListener("click",function (){
    if(input.value !==" " &&  textArea.value !==" " && timeTask.value != " "){
        addTask(input.value, textArea.value, timeTask.value);
        input.value = " ";
        textArea.value = " ";  
        timeTask.value = " ";   
    }
})
    listTask.addEventListener("click" , (e) =>{
        // delete from page
        if(e.target.classList.contains("dele")){
            e.target.parentElement.remove();
        // delete from local
       removeLocal(e.target.parentElement.getAttribute("data-id"));
        }
        // edit task
        if(e.target.classList.contains("edit")){
            e.target.parentElement.setAttribute("contenteditable" ,"true");
            e.target.classList.add("save");

        }else if(e.target.classList.contains("save")){
            e.target.parentElement.removeAttribute("contenteditable");
            e.target.classList.remove("save")

        }
       // complete task
       if(e.target.classList.contains("newTask")){
            e.target.classList.toggle("done");
        }
      });

   function addTask(titleTask, description,timetext){
    const taskData ={
        id: Date.now(),
        title:titleTask,
        desc:description,
        timtext:timetext,
        status:false,
     };
     arrayTask.push(taskData);
     addTaskToPage(arrayTask);
     addTaskLocal(arrayTask);
     }
   function addTaskToPage(arrayTask){
       listTask.innerHTML =" " + "<h4>" + "All Task" + "</h4>";
       arrayTask.forEach((taskData) => {
        let div = document.createElement("div");
         div.className ="newTask";
         if(taskData.status == true){
            div.className ="newTask done";
        }
        div.setAttribute("data-id", taskData.id);
       
        let span =document.createElement("span");
        let spanText = document.createTextNode(taskData.title);
        span.appendChild(spanText);
        let paragraph = document.createElement("p");
        let paragrapText = document.createTextNode(taskData.desc);
        paragraph.appendChild(paragrapText);
        div.appendChild(span);
        div.appendChild(paragraph);
        let timtasks =document.createElement("span");
        timtasks.style.display ="block";
        let timtext = document.createTextNode(taskData.timtext);
        timtasks.appendChild(timtext);
        div.appendChild(timtasks);
        // create deletebtn
        let btnDel = document.createElement("button");
        btnDel.className ="dele";
        let btnText = document.createTextNode("Delete");
        btnDel.appendChild(btnText);
        div.appendChild(btnDel);
        // create edit button
        let editBtn = document.createElement("button");
        editBtn.className ="edit";
        let editText = document.createTextNode("Edit");
        editBtn.appendChild(editText);
        div.appendChild(editBtn); 
        listTask.appendChild(div);   
       });
   }

   function addTaskLocal(arrayTask){
    localStorage.setItem("tasks", JSON.stringify(arrayTask));
}

function getData(){
    let dataTask = localStorage.getItem("tasks");
    if (dataTask){
    let taskes =  JSON.parse(dataTask);
       addTaskToPage(taskes);
    }
}

   function removeLocal(taskid){
   arrayTask =arrayTask.filter((taskData) => taskData.id != taskid);
   addTaskLocal(arrayTask);
   }

  
