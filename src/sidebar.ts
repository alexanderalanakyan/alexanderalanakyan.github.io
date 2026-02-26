const pages = "./pages";
const htmlPages: string[] = ["homepage.html", "index.html", "pageTemplate.html"];

document.addEventListener("DOMContentLoaded", () => {
        const list = document.createElement("ul")
        list.id = "sidebar-links-list"
        let sidebar = document.querySelector(".sidebar") || null

        if(!sidebar) 
            {
            sidebar = document.createElement("div")
            sidebar.className = "sidebar"
            } 
        sidebar.appendChild(list)
       htmlPages.forEach((page) => { 

       
            const li = document.createElement("ul")
            const link = document.createElement("a")
            link.href=`${pages}/${page}`
            link.textContent = page;
            li.appendChild(link)
            list.appendChild(li)
        })
}) 



