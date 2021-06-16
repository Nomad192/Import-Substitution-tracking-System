if (!localStorage.theme) 
{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
    {
        document.body.classList.toggle("dark");
        localStorage.theme = "light";
    } 
    else
    {
        localStorage.theme = "dark";
    }
} 
else
{
    if (localStorage.theme == "light")
    {
        document.body.classList.toggle("dark");
    } 
    else if (localStorage.theme == "dark")
    {

    }
    else
    {
        console.log("PRE ERROR: " + localStorage.theme + " not a valid color theme!");
        localStorage.theme = "dark";
    }
}

themeButton.onclick = () => {
    document.body.classList.toggle("dark");

    if (localStorage.theme == "light")
    {
        localStorage.theme = "dark";
    }
    else if (localStorage.theme == "dark")
    {
        localStorage.theme = "light";
    }
    else
    {
        console.log("ERROR: " + localStorage.theme + " not a valid color theme!");
        const userLang = document.body.className;
        if (userLang.indexOf("dark") !== -1)
        {
            localStorage.theme = "dark";
        } 
        else
        {
            localStorage.theme = "light";
        }
    }
}