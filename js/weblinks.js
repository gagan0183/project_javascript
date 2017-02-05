// List of links to show. Each link has:
// - a title
// - a URL
// - an author (the person who added it)

var linkList = [
    {
        title: "Kottke",
        url: "http://kottke.org",
        author: "brett.suggs"
    },
    {
        title: "National Geographic",
        url: "http://www.nationalgeographic.com",
        author: "jessica"
    },
    {
        title: "American Museum of Natural History",
        url: "http://www.amnh.org",
        author: "aurora.nicole"
    }
];

function createLinkElement(link) {
    var linktitle = document.createElement("a");
    linktitle.href = link.url;
    linktitle.style.color = "#428bca";
    linktitle.style.textDecoration = "none";
    linktitle.style.marginRight = "5px";
    linktitle.appendChild(document.createTextNode(link.title));

    var linkUrl = document.createElement("span");
    linkUrl.appendChild(document.createTextNode(link.url));

    var titleLine = document.createElement("h4");
    titleLine.style.margin = "0px";
    titleLine.appendChild(linktitle);
    titleLine.appendChild(linkUrl);

    var detailsLine = document.createElement("span");
    detailsLine.appendChild(document.createTextNode("Added by " + link.author));

    var linkDiv = document.createElement("div");
    linkDiv.classList.add("link");
    linkDiv.appendChild(titleLine);
    linkDiv.appendChild(detailsLine);

    return linkDiv;
}

var content = document.getElementById("content");
content.appendChild(createButton());
linkList.forEach(function (link) {
    var linkElement = createLinkElement(link);
    content.appendChild(linkElement);
});


function createButton() {
    console.log("create");
    var add = document.createElement("button");
    add.id = "add";
    add.textContent = "Add";
    var p = document.createElement("p");
    p.appendChild(add);
    return p;
}

function createForm() {
    var title = document.createElement("input");
    title.id = "title";
    title.placeholder = "Enter title";
    title.style.marginRight = "9px";
    title.setAttribute("required", "true");
    var author = document.createElement("input");
    author.id = "author";
    author.placeholder = "Enter author";
    author.style.marginRight = "9px";
    author.setAttribute("required", "true");
    var url = document.createElement("input");
    url.id = "url";
    url.placeholder = "Enter url";
    url.style.marginRight = "9px";
    url.setAttribute("required", "true");
    var form = document.createElement("form");
    var add = document.createElement("button");
    add.id = "addLink";
    add.textContent = "Add";
    var p = document.createElement("p");
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(url);
    form.appendChild(add);
    p.appendChild(form);
    return p;
}

var add = document.getElementById("add");
add.addEventListener("click", function(e) {
    document.getElementById("add").style.display = "none";
    var form = createForm();
    content.insertAdjacentElement("afterBegin", form);

    var url = document.getElementById("url");
    url.addEventListener("blur", function(e){
        var url = e.target.value;
        if(!(url.startsWith("http://")||url.startsWith("https://"))) {
            e.target.value = "http://" + url;
        }
    });

    var addLink = document.getElementById("addLink");
    addLink.addEventListener("click", function(e) {
        var object =  {
            title: document.getElementById("title").value,
            url: document.getElementById("url").value,
            author: document.getElementById("author").value
        };
        var elements = document.getElementsByClassName("link");
        elements[0].insertAdjacentElement("beforeBegin", createLinkElement(object));
        var div = document.createElement("div");
        div.id = "message";
        div.innerHTML = "The link to " + object.title + " has been successfully added to the list";
        content.insertAdjacentElement("afterBegin", div);
        document.getElementById("title").style.display = "none";
        document.getElementById("author").style.display = "none";
        document.getElementById("url").style.display = "none";
        document.getElementById("addLink").style.display = "none";
        document.getElementById("add").style.display = "inline";

        var label = document.getElementById("message");
        setTimeout(function(){
            label.style.display = "none";
        }, 2000);
        e.preventDefault();
    });
});



