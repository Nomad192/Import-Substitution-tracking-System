let header = document.querySelector('header');
let section = document.querySelector('section');

let requestURL = "form.php";
let request = new XMLHttpRequest();

let path = window.location.pathname;
let page = path.split("/").pop().replace("%20", " ");
console.log("request \"\"" + page + "\"\"");

request.open("GET", "name-form.php?name=\"" + page + "\""); 

request.send();    

let response_information;

request.onload = function() 
{
    if (request.status != 200) 
    {
        upload_the_error_name(`Error ${request.status}: ${request.statusText}`); 
    } 
    else 
    { 
        console.log("response \"" + request.response + "\"");

        try 
        {
            response_information = JSON.parse(request.response);
            try
            {
                upload_the_main_name(response_information["name"]);   
                //array_sort(response_information["projects"]);
                //array_sort(response_information["daughters"]);
                upload_array(response_information["daughters"], "daughters", upload_daughter);
                upload_array(response_information["projects"], "projects", upload_project);
                upload_path(response_information["path"], "path", upload_path); 
            } 
            catch (err) 
            {
                console.log(request.response);
                upload_the_error_name("|Parse error: " + err);
            }            
        }
        catch (err) 
        {
            console.log(request.response);
            upload_the_error_name("Database " + request.response);
        }

        
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 500);
    }
};

request.onprogress = function (event) 
{ 
    if (event.lengthComputable) 
    {
        if (`${event.loaded}` != `${event.total}`)
        {
            upload_the_warning_name(`Received ${event.loaded} out of ${event.total} bytes`);
        }
    } 
    else 
    {
        upload_the_warning_name(`${event.loaded} bytes received`);
    }
};

request.onerror = function() 
{ 
    upload_the_error_name("Database connection error");
};

function upload_the_warning_name (name_str) 
{
    let name = document.createTextNode(name_str + '\n');
    let name_class = document.getElementById('main-name');
    name_class.className = "links warning";    
    name_class.appendChild(name);
}

function upload_the_error_name (name_str) 
{
    let name = document.createTextNode(name_str + '\n');
    let name_class = document.getElementById('main-name');
    name_class.className = "links error";    
    name_class.appendChild(name);
}

function upload_the_main_name (name_str) {
    let name = document.createTextNode(name_str);
    let name_class = document.getElementById('main-name');
    while (name_class.firstChild) 
    {
        name_class.removeChild(name_class.firstChild);
    }
    name_class.appendChild(name);
}

function upload_array (array, id, func)
{      
    let i = 0;
    for (; i < array.length; i++) 
    {
        func(array[i]);
    }
    if (i > 0)
    {
        document.getElementById(id).classList.toggle("none");
    }
}

function upload_path (array, id, func)
{
    document.getElementById(id).classList.toggle("none"); 

    let name_class = document.getElementById("path");

    for (let i = array.length-1; i > 0; i--) 
    {
        name_class.appendChild(document.createElement("BR"));

        let name_link = document.createElement("a");
        name_link.appendChild(document.createTextNode(array[i]["name"]));
        name_link.href = '/' + array[i]["id"]; 
        name_link.className = "links name-color";    
        name_class.appendChild(name_link);

        name_class.appendChild(document.createElement("BR")); 
        name_class.appendChild(document.createTextNode("↓"));         
    }

    name_class.appendChild(document.createElement("BR"));

    let name_link = document.createElement("a");
    name_link.appendChild(document.createTextNode(array[0]["name"]));
    name_link.href = '/' + array[0]["id"]; 
    name_link.className = "links name-color";    
    name_class.appendChild(name_link);

    name_class.appendChild(document.createElement("BR"));  
}

function upload_daughter (element)
{
    let row = document.createElement("TR");

    let name = document.createElement("TD");

    let name_link = document.createElement("a");
    name_link.appendChild(document.createTextNode(element["name"]));
    name_link.href = '/' + element["id"]; 
    name_link.className = "links name-color";    
    name.appendChild(name_link);
    row.appendChild(name); 
       
    let volume_inv = document.createElement("TD");
    let volume_inv_number = parseInt(element["volume"])/parseInt(element["volume_import"]);
    volume_inv.appendChild (document.createTextNode(volume_inv_number + "%"));
    row.appendChild(volume_inv);    

    let volume_soft = document.createElement("TD");
    let volume_soft_number = parseInt(element["cost"])/parseInt(element["cost_import"]);
    volume_soft.appendChild (document.createTextNode(volume_soft_number + "%"));
    row.appendChild(volume_soft);

    let name_class = document.getElementById("daughters");
    name_class.appendChild(row);    
}

function upload_project (element)
{
    let row = document.createElement("TR");

    let status = document.createElement("TD"); 
    status.appendChild(document.createTextNode(element["status"]));
    row.appendChild(status); 
       
    let name = document.createElement("TD");
    name.appendChild (document.createTextNode(element["name"]));
    row.appendChild(name);    

    let cost = document.createElement("TD");
    cost.appendChild (document.createTextNode(element["cost"]));
    row.appendChild(cost);

    let name_class = document.getElementById("projects");
    name_class.appendChild(row);   
}

sortButtonDaughtersName.onclick = () => 
{
    return sortButtonProject("sortButtonDaughtersName", "daughters", upload_daughter);
}

sortButtonDaughtersVolume.onclick = () => 
{
    return sortButtonProject("sortButtonDaughtersVolume", "daughters", upload_daughter);
}

sortButtonDaughtersCost.onclick = () => 
{
    return sortButtonProject("sortButtonDaughtersCost", "daughters", upload_daughter);
}

sortButtonProjectsStatus.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsStatus", "projects", upload_project);
}

sortButtonProjectsName.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsName", "projects", upload_project);
}

sortButtonProjectsCost.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsCost", "projects", upload_project);
}

function sortButtonProject (id_button, id_array, func)
{
    let array = response_information[id_array];
    let button = document.getElementById(id_button);
    let key = button.value;
    let invert = (button.className.indexOf("invert") != -1) ? 1 : -1;   
     
    sort(array, key, invert);

    let parent = document.getElementById(id_array);
    remove_childs(parent, array.length); 

    reupload_array(array, func);  

    button.classList.toggle("invert");    
}

function sort (array, key, invert)
{
    array.sort(function(obj1, obj2) {
            if (obj1[key].toLowerCase() > obj2[key].toLowerCase()) return invert;        
            if (obj1[key].toLowerCase() < obj2[key].toLowerCase()) return -invert;
            if (key != "name")
            {
                if (obj1["name"].toLowerCase() > obj2["name"].toLowerCase()) return 1;        
                if (obj1["name"].toLowerCase() < obj2["name"].toLowerCase()) return -1;    
            }
            return 0;
        });
}

function reupload_array (array, func)
{      
    let i = 0;
    for (; i < array.length; i++) 
    {
        func(array[i]);
    }
}

function remove_childs (parent, quantity) {
    for (; quantity > 0; quantity--) 
    {
        parent.removeChild(parent.lastChild);
    }
}