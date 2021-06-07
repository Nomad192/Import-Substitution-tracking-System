if (!localStorage.language) 
{
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.indexOf("ru") !== -1)
    {
        document.body.classList.toggle("ru");
        document.body.classList.toggle("en");
        document.title = "ССП";
        localStorage.language = "ru";
    } 
    else if (userLang.indexOf("en") !== -1)
    {
        localStorage.language = "en";
    }
    else
    {
        alert("ERROR: " + localStorage.language + " not a valid language!");
        localStorage.language = "en";
    }
} 
else
{
    if (localStorage.language == "ru")
    {
        document.body.classList.toggle("ru");
        document.body.classList.toggle("en");
        document.title = "ССП";
    } 
    else if (localStorage.language == "en")
    {
    }
    else
    {
        alert("ERROR: " + localStorage.language + " not a valid language!");
        localStorage.language = "en";
    }
}

langButton.onclick = () => {
    document.body.classList.toggle("ru");
    document.body.classList.toggle("en");

    if (document.body.className.indexOf("ru") !== -1)
    {
        document.title = "ССП";        
    } 
    else
    {
        document.title = "PTS";
    }


    if (localStorage.language == "en")
    {
        localStorage.language = "ru";
    }
    else if (localStorage.language == "ru")
    {
        localStorage.language = "en";
    }
    else
    {
        alert("ERROR: " + localStorage.language + " not a valid language!");
        const userLang = document.body.className;
        if (userLang.indexOf("en") !== -1)
        {
            localStorage.language = "en";
        } 
        else if (userLang.indexOf("ru") !== -1)
        {
            localStorage.language = "ru";
        }
    }
}