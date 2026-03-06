document.addEventListener("DOMContentLoaded", async () => {
    const list = document.createElement("ul");
    list.id = "sidebar-links-list";

    let sidebar = document.querySelector(".sidebar");
    if (!sidebar) {
        sidebar = document.createElement("div");
        sidebar.className = "sidebar";
        document.body.appendChild(sidebar);
    }

    sidebar.appendChild(list);

    try {
        const response = await fetch("../www/pages.json");
        if (!response.ok) {
            throw new Error(`pages.json request failed with ${response.status}`);
        }

        const htmlPages = (await response.json()) as string[];
        console.log("Loaded pages:", htmlPages);

        htmlPages.forEach((page) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = page;
            link.textContent = page;
            li.appendChild(link);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Sidebar failed to load pages", error);
    }
});



