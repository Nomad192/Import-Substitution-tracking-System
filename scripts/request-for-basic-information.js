let request = new XMLHttpRequest();

let path = window.location.pathname;
let page = path.split("/").pop();
console.log("request 3 \"\"" + page + "\"\"");

request.open("GET", "requests/name-form.php?name=\"" + page + "\""); 

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
        try 
        {
            response_information = JSON.parse(request.response);
            console.log(response_information);            
            try
            {
                upload_the_main_name(response_information["name"]);
                upload_fractions(response_information);
                upload_array(response_information["daughters"], "daughters", upload_daughter, "daughtersButton");
                upload_array(response_information["projects"], "projects", upload_project, "projectButton");
                upload_path(response_information["path"], "path", upload_path); 
            } 
            catch (err) 
            {
                upload_the_error_name("|Parse error: " + err);
            }            
        }
        catch (err) 
        {
            console.log("response \"" + request.response + "\"");            
            upload_the_error_name("Database: " + request.response);
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

function upload_the_main_name (name_str) 
{
    let name = document.createTextNode(name_str);
    let name_class = document.getElementById('main-name');
    
    while (name_class.firstChild) 
    {
        name_class.removeChild(name_class.firstChild);
    }

    let name_link = document.createElement("a");
    name_link.appendChild(name);
    name_link.href = ""; 
    name_link.className = "links name-color";
    name_class.appendChild(name_link);   
}

function upload_fractions(element) 
{
    let name_class = document.getElementById('main-name');

    let volume_imp_number = (element["volume_import"])/(element["volume"]);
    if (isNaN(volume_imp_number))
    {
        name_class.appendChild (document.createTextNode("\u00A0NaN"));
    }
    else if (volume_imp_number > 0.01)
    {
        volume_imp_number = Math.round(volume_imp_number * 100) / 100;
        name_class.appendChild (document.createTextNode("\u00A0" + volume_imp_number + "%"));  
    }
    else
    {
        name_class.appendChild (document.createTextNode("\u00A0<0.01%"));      
    }

    let volume_soft_number = (element["cost_import"])/(element["cost"]);
    if (isNaN(volume_soft_number))
    {
        name_class.appendChild (document.createTextNode(" NaN"));
    }
    else if (volume_soft_number > 0.01)
    {
        volume_soft_number = Math.round(volume_soft_number * 100) / 100;
        name_class.appendChild (document.createTextNode(" " + volume_soft_number + "%"));  
    }
    else
    {
        name_class.appendChild (document.createTextNode(" <0.01%"));      
    }
}

function upload_array (array, id, func, id_button)
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
    else 
    {
        document.getElementById(id_button).classList.toggle("none");
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
       
    let volume_imp = document.createElement("TD");
    let volume_imp_number = (element["volume_import"])/(element["volume"]);
    if (isNaN(volume_imp_number))
    {
        volume_imp_number = 0;
        volume_imp.appendChild (document.createTextNode("NaN"));
    }
    else if (volume_imp_number > 0.01)
    {
        volume_imp_number = Math.round(volume_imp_number * 100) / 100;
        volume_imp.appendChild (document.createTextNode(volume_imp_number + "%")); 
    }
    else
    {
        volume_imp_number = 0;
        volume_imp.appendChild (document.createTextNode("<0.01%"));      
    }
    element["volume_fraction"] = volume_imp_number;
    row.appendChild(volume_imp);    

    let volume_soft = document.createElement("TD");
    let volume_soft_number = (element["cost_import"])/(element["cost"]);
    if (isNaN(volume_soft_number))
    {
        volume_soft_number = 0;
        volume_soft.appendChild (document.createTextNode("NaN"));
    }
    else if (volume_soft_number > 0.01)
    {
        volume_soft_number = Math.round(volume_soft_number * 100) / 100;
        volume_soft.appendChild (document.createTextNode(volume_soft_number + "%")); 
    }
    else
    {
        volume_soft_number = 0;
        volume_soft.appendChild (document.createTextNode("<0.01%"));      
    }
    element["cost_fraction"] = volume_soft_number;    
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
    return sortButtonProject("sortButtonDaughtersName", "daughters", upload_daughter, "str");
}

sortButtonDaughtersVolume.onclick = () => 
{
    return sortButtonProject("sortButtonDaughtersVolume", "daughters", upload_daughter, "int");
}

sortButtonDaughtersCost.onclick = () => 
{
    return sortButtonProject("sortButtonDaughtersCost", "daughters", upload_daughter, "int");
}

sortButtonProjectsStatus.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsStatus", "projects", upload_project, "str");
}

sortButtonProjectsName.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsName", "projects", upload_project, "str");
}

sortButtonProjectsCost.onclick = () =>
{
    return sortButtonProject("sortButtonProjectsCost", "projects", upload_project, "int");
}

let activeSort;

function sortButtonProject (id_button, id_array, func, StrOrInt)
{
    let array = response_information[id_array];
    let button = document.getElementById(id_button);    
    if (activeSort == id_button)
    {
        button.classList.toggle("invert");        
    }  
    else
    {
        activeSort = id_button;         
    }    

    let key = button.value;
    let invert = (button.className.indexOf("invert") != -1) ? -1 : 1;   
     
    sort(array, key, invert, StrOrInt);

    let parent = document.getElementById(id_array);
    remove_childs(parent, array.length); 

    reupload_array(array, func);  
}

function sort (array, key, invert, StrOrInt)
{
    if (StrOrInt == "int")
    {
     array.sort(function(obj1, obj2) {
            if (obj1[key] > obj2[key]) return invert;        
            if (obj1[key] < obj2[key]) return -invert;
            if (obj1["name"].toLowerCase() > obj2["name"].toLowerCase()) return 1;        
            if (obj1["name"].toLowerCase() < obj2["name"].toLowerCase()) return -1;    
            return 0;
        });        
    } 
    else
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