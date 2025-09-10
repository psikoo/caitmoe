export async function processCommand(command) {
    command = command.split(" ");
    //Game
    if(command[0] == "play" || command[0] == "p") {
        let res = await getURL("https://www.cait.moe:8443/api/tamagotchi/play");
        clearOld();
        addToOld(command[0], await calculateTamagotchiString(JSON.parse(res).message));}
    else if(command[0] == "feed" || command[0] == "f") {
        let res = await getURL("https://www.cait.moe:8443/api/tamagotchi/feed");
        clearOld();
        addToOld(command[0], await calculateTamagotchiString(JSON.parse(res).message));}
    else if(command[0] == "rest" || command[0] == "s") {
        let res = await getURL("https://www.cait.moe:8443/api/tamagotchi/rest");
        clearOld();
        addToOld(command[0], await calculateTamagotchiString(JSON.parse(res).message));}
    //Utils
    else if(command[0] == "help") {
        addToOld(command[0], helpString);} 
    else if(command[0] == "main") {
        let pages = "";
        if(window.location.hostname == "psikoo.github.io") { pages = "/website/"; }
        window.location.href = window.location.protocol + "//" + window.location.hostname + pages; }
    else if(command[0] == "tamagotchi" || command[0] == "reload" || command[0] == "r") {
        await getURL("https://www.cait.moe:8443/api/tamagotchi/reload");
        clearOld();
        addToOld(command[0], await calculateTamagotchiString("Reloaded Tamagotchi"));}
    //Github
    else if(command[0] == "repo") {
        clearOld();
        addToOld(command[0], repoString);}
    //Admin
    else if(command[0] == "add" && command[1] == "new") {
        await getURL("https://www.cait.moe:8443/api/tamagotchi/new");
        clearOld();
        addToOld("tamagotchi", await calculateTamagotchiString());}
    //Unknown
    else {
        clearOld();
        addToOld(command[0], commandNotFoundString);}
}

function addToOld(command , content) {
    document.getElementById("old").innerHTML += "<div>psikoo@github.io:~$ "+command+"</div>";
    if(content != undefined) {
        document.getElementById("old").innerHTML += content;
    }
    document.getElementById("terminal").innerHTML = "psikoo@github.io:~$ ";
}

function clearOld() {
    document.getElementById("old").innerHTML = "";
}

async function calculateTamagotchiString(res) {
    let calculatedString = tamagotchiString + await getTamagotchi(res);
    return calculatedString
}

async function getURL(url) {
    let headersList = {
        "Accept": "*/*",
    }
    let response = await fetch(url, { 
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
    return data;
}

function stateToEmoji(state) {
    let string = "";
    if(state == "Dead") {
        string += "☠️ Dead"
    } else {
        string += "💖 Alive"
    }
    return string;
}
function numToBar(num) {
    let bar = "";
    bar += "█".repeat(num);
    bar += "░".repeat(10-num);
    bar += " ("+num+")";
    return bar;
}

async function getTamagotchi(res) {
    let data = JSON.parse(await getURL("https://www.cait.moe:8443/api/tamagotchi/tamagotchi"));
    let age;
    let info = "";
    if(data.state == "Dead") {
        age = (((data.deadTime-data.bornTime)/1000)/3600).toFixed(2);
    } else {
        age = (((new Date().valueOf()-data.bornTime)/1000)/3600).toFixed(2);
    }

    if(res != undefined) {
        info = res;
    }

    let tamagotchi = `<pre class="customFont">
┌──────────────────────────────────────────────────────────────────────────────────────┐

    ┌───[ 👾 ${data.name} ]───[ 📅 ${age} hours ]───[ ${stateToEmoji(data.state)} ]───┐    

        😄:${numToBar(data.happiness)} 
        🍗:${numToBar(data.hunger)} 
        💤:${numToBar(data.energy)}

        ${info}
        

└──────────────────────────────────────────────────────────────────────────────────────┘

</pre>`;
    return tamagotchi;
}

let repoString = "<a href=\"https://github.com/psikoo/website\" target=\"_blank\">&gtgithub.com/psikoo/website</a>"

let helpString = `<pre class="customFont">
> Game commands
    > play
    > feed
    > rest
    > reload
> Utility commands
    > help
    > main
    > add new &ltname&gt
> Github
    > repo
</pre>`;

let tamagotchiString = `<pre class="customFont">
                                                                                       
████████╗ █████╗ ███╗   ███╗ █████╗  ██████╗  ██████╗ ████████╗ ██████╗██╗  ██╗██╗     
╚══██╔══╝██╔══██╗████╗ ████║██╔══██╗██╔════╝ ██╔═══██╗╚══██╔══╝██╔════╝██║  ██║██║     
   ██║   ███████║██╔████╔██║███████║██║  ███╗██║   ██║   ██║   ██║     ███████║██║     
   ██║   ██╔══██║██║╚██╔╝██║██╔══██║██║   ██║██║   ██║   ██║   ██║     ██╔══██║██║     
   ██║   ██║  ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝╚██████╔╝   ██║   ╚██████╗██║  ██║██║     
   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝ v1.0
Welcome to a multiplayer version of tamagotchi. Try using "help" for a list of commands
                                                                            </pre>`;

let commandNotFoundString = "The given command doesn't exist.";