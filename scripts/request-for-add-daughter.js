openWindowAddDaughter.onclick = () =>
{
    document.getElementById("add-daughter").classList.toggle("none");
}

openPathWindowAddDaughter.onclick = () =>
{
    document.getElementById("add-daughter").classList.toggle("none");
}

addButtonDaughter.onclick = () =>
{
    let name = document.getElementById("form-name");
    let id = document.getElementById("form-id");

    if (name.value == "")
    {
        name.reportValidity();
        return;
    }

    if (id.value == "")
    {
        id.reportValidity();
        return;
    }

    document.getElementById("all-content").classList.toggle("modal-is-oppened");
    document.getElementById("modal").classList.toggle("none");
    document.getElementById("block").classList.toggle("none");

    let modal_name = document.getElementById("modal-name");
    let modal_id = document.getElementById("modal-id");

    let name_pred;
    const userLang = document.body.className;
    if (userLang.indexOf("en") !== -1)
    {
        name_pred = "Name: ";
    } 
    else if (userLang.indexOf("ru") !== -1)
    {
        name_pred = "Название: ";
    }

    let id_pred = "Id: ";

    while (modal_name.firstChild) 
    {
        modal_name.removeChild(modal_name.firstChild);
    }

    while (modal_id.firstChild) 
    {
        modal_id.removeChild(modal_id.firstChild);
    }

    modal_name.appendChild(document.createTextNode(name_pred + name.value));
    modal_id.appendChild(document.createTextNode(id_pred + id.value));
}

cancelButton.onclick = () =>
{
    document.getElementById("all-content").classList.toggle("modal-is-oppened");
    document.getElementById("modal").classList.toggle("none");
    document.getElementById("block").classList.toggle("none");
}

sendButton.onclick = () =>
{
    document.getElementById("modal-block").classList.toggle("none");

    let request = new XMLHttpRequest();
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let name = document.getElementById('form-name').value;
    let id = document.getElementById('form-id').value;

    console.log("request 0 \"\"" + name + "\" \"" + id + "\" \"" + page + "\"\"");

    request.open("GET", "requests/add-daughter.php?name=\"" + name + "\"&id=\"" + id + "\"&parent=\"" + page + "\""); 
    request.send();

    request.onload = function() 
    {
        if (request.status != 200) 
        {
            document.getElementById("modal-error").classList.toggle("none");
            setTimeout(close, 1000, `Error ${request.status}: ${request.statusText}`); 
        } 
        else 
        { 
            console.log("response \"" + request.response + "\"");
            if (request.response == "success")
            {
                document.getElementById("modal-success").classList.toggle("none");
                setTimeout(reload, 1000);     
            } 
            else
            {
                document.getElementById("modal-error").classList.toggle("none");
                setTimeout(close, 1000, request.response);
            } 
        }
    };
    request.onprogress = function (event) 
    { 
        if (event.lengthComputable) 
        {
            if (`${event.loaded}` != `${event.total}`)
            {
                console.log(`Received ${event.loaded} out of ${event.total} bytes`);
            }
        } 
        else 
        {
            console.log(`${event.loaded} bytes received`);
        }
    };
    request.onerror = function() 
    { 
        document.getElementById("modal-error").classList.toggle("none");
        setTimeout(close, 1000, "Database connection error");
    };
}

function reload()
{
    window.location.reload();
}

function close(response)
{
    document.getElementById("all-content").classList.toggle("modal-is-oppened");
    document.getElementById("modal").classList.toggle("none");
    document.getElementById("block").classList.toggle("none");
    document.getElementById("modal-error").classList.toggle("none");
    document.getElementById("modal-block").classList.toggle("none"); 
    let error = document.getElementById("error-add-text");
    error.classList.remove("none");
    document.getElementById("standard-add-text").classList.add("none");
    if (response != "Error: id is busy!")
    {
        while (error.firstChild) 
        {
            error.removeChild(error.firstChild);
        }
        error.appendChild(document.createTextNode(response));
    }
}