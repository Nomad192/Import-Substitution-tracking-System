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
            upload_the_error_name("Database error");
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
       
    let td2 = document.createElement("TD");
    td2.appendChild (document.createTextNode(element["pr1"]));
    row.appendChild(td2);    

    let td3 = document.createElement("TD");
    td3.appendChild (document.createTextNode(element["pr2"]));
    row.appendChild(td3);

    let name_class = document.getElementById("daughters");
    name_class.appendChild(row);    
}

function upload_project (element)
{
    let row = document.createElement("TR");

    let status = document.createElement("TD"); 
    status.appendChild(document.createTextNode(element["stat"]));
    row.appendChild(status); 
       
    let name = document.createElement("TD");
    name.appendChild (document.createTextNode(element["name"]));
    row.appendChild(name);    

    let volume = document.createElement("TD");
    volume.appendChild (document.createTextNode(element["volume"]));
    row.appendChild(volume);

    let name_class = document.getElementById("projects");
    name_class.appendChild(row);   
}

sortButtonDaughters.onclick = () => 
{
    let key = document.getElementById("sortButtonDaughters").value;
    sort_button("daughters", key);
    reupload_array(response_information["daughters"], "daughters", upload_daughter);
}

sortButtonProjects.onclick = () => 
{
    let key = document.getElementById("sortButtonProjects").value;
    sort_button("projects", key);
    reupload_array(response_information["projects"], "projects", upload_project);
}

function sort_button (id, key)
{
    let invert = (document.getElementById(id).className.indexOf("invert") != -1) ? -1 : 1;
    document.getElementById(id).classList.toggle("invert");

    let array = response_information[id];

    array.sort(function(obj1, obj2) {
            if (obj1[key].toLowerCase() > obj2[key].toLowerCase()) return invert;        
            if (obj1[key].toLowerCase() < obj2[key].toLowerCase()) return -invert;
            return 0;
        });
}

function reupload_array (array, id, func)
{      
    remove_childs(id, array.length);    
    let i = 0;
    for (; i < array.length; i++) 
    {
        func(array[i]);
    }
}

function remove_childs (id, k) {
    let parent = document.getElementById(id);
    for (; k > 0; k--) 
    {
        parent.removeChild(parent.lastChild);
    }
}