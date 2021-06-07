let header = document.querySelector('header');
let section = document.querySelector('section');

let requestURL = "form.php";
let request = new XMLHttpRequest();

let path = window.location.pathname;
let page = path.split("/").pop().replace("%20", " ");
console.log("request \"\"" + page + "\"\"");

request.open("GET", "name-form.php?name=\"" + page + "\"");   

request.send();    

request.onload = function() 
{
    if (request.status != 200) 
    {
        upload_the_error_name(`Error ${request.status}: ${request.statusText}`); 
    } 
    else 
    { 
        console.log("response \"" + request.response + "\"");
        if (request.response == "")
        {
            upload_the_error_name("Companies with the name \"" + page + "\" not found in the database");
        }
        else
        {
            let response_information;
            try 
            {
                response_information = JSON.parse(request.response);
                upload_the_main_name(response_information["name"]);   
                upload_array(response_information["daughters"], "daughters", "name", "pr1", "pr2");
                upload_array(response_information["projects"], "projects", "stat", "name", "volume"); 
            } 
            catch (err) 
            {
                upload_the_error_name(err);
            }
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
    //document.getElementById('content-map').classList.toggle("none");
    //document.getElementById('projects').classList.toggle("none");
    //document.getElementById('daughters').classList.toggle("none");    
}

function upload_array (array, id, inf_one, inf_two, inf_three)
{
    document.getElementById(id).classList.toggle("none"); 

    for (let i = 0; i < array.length; i++) 
    {
        upload_element(array[i], id, inf_one, inf_two, inf_three);
    }
}

function upload_element (element, id, inf_one, inf_two, inf_three)
{
    let row = document.createElement("TR");

    let name = document.createElement("TD");
    /*name.appendChild(document.createTextNode(element[inf_one]));
    name.className = "links name-color"; */

    let name_link = document.createElement("a");
    name_link.appendChild(document.createTextNode(element[inf_one]));
    name_link.href = '/' + element[inf_one]; 
    name_link.className = "links name-color";    
    name.appendChild(name_link);
    row.appendChild(name); 
       
    var td2 = document.createElement("TD");
    td2.appendChild (document.createTextNode(element[inf_two]));
    row.appendChild(td2);    

    var td3 = document.createElement("TD");
    td3.appendChild (document.createTextNode(element[inf_three]));
    row.appendChild(td3);

    let name_class = document.getElementById(id);
    name_class.appendChild(row);    
}

// id того места, где форма

/*function redirect(text)
{
    alert(text);
}

function up(name) {
  // var servResponse = document.querySelector('#response')

  // название формы (ourForm)
      // var name = document.forms.ourForm.ourForm_inp.value;
      // name = encodeURIComponent(name)
      var xhr = new XMLHttpRequest()
      // пост - текстовый запрос, релизовывать на пыхе
      xhr.open('GET', 'form.php')
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function (){
          if (xhr.readyState === 4 && xhr.status ===    200) {
            //ответ
              //// console.log(xhr.response);
                            //console.log('resp');
            console.log('cccc' + xhr.responseText);
            redirect(xhr.responseText);
            return;
            // servResponse.textContent = xhr.responseText;
          }
      }
      xhr.send();
}




up();



function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['squadName'];
  header.appendChild(myH1);

  var myPara = document.createElement('p');
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
  header.appendChild(myPara);
}

function showHeroes(jsonObj) {
  var heroes = jsonObj['members'];

  for (var i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';

    var superPowers = heroes[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}*/


/*

addRow("daughters", "1");
addRow("daughters", "2");

function addRow (id, num)
{
    var tbody = document.getElementById(id);
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")
    td1.appendChild(document.createTextNode(num))
    var td2 = document.createElement("TD")
    td2.appendChild (document.createTextNode("column 2"))
    var td3 = document.createElement("TD")
    td3.appendChild (document.createTextNode("column 3"))
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
}*/