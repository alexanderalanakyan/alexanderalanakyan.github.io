const pages = "./pages";
const htmlPages: string[] = ["homepage.html", "index.html", "pageTemplate.html"];

document.addEventListener("DOMContentLoaded", () => {
        const list = document.createElement("ul");
        list.id = "sidebar-links-list";

    try {
        document.querySelector(".sidebar")!.appendChild(list);
    }
     catch (error)
    {
        console.error("Error appending sidebar list:", error, "Making one now...");
        const sidebar = document.createElement("div");
        sidebar.className = "sidebar";
        document.body.appendChild(sidebar);
        sidebar.appendChild(list);
    htmlPages.forEach(
        (page) => 
        {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `${pages}/${page}`;
        link.textContent = page;
        listItem.appendChild(link);
        list!.appendChild(listItem);
        });
    }
})



