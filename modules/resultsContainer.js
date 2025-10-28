class ResultsContainer {
    constructor() {
        this.container = null;
    }

    show(arr) {
        if (this.container) return;
        const composerForm = document.querySelector(chatSelectors[host]);
        this.container = document.createElement("div");
        this.container.setAttribute("class", "results-prompter-container")
        Object.assign(this.container.style, {
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            marginBottom: "10px",
            backgroundColor: "rgb(48, 48, 48)",
            borderRadius: "13px",
            padding: "5px"
        });
        arr.forEach((title, i) => {
            const containerTitle = document.createElement("div");
            Object.assign(containerTitle.style, {
                maxHeight: "40px",
                overflowY: "auto",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
                borderRadius: "5px"
            });
            // on hover
            containerTitle.addEventListener("mouseover", () => {
                containerTitle.style.backgroundColor = "rgba(24, 24, 24, 1)";
            });
            // out of hover
            containerTitle.addEventListener("mouseout", () => {
                containerTitle.style.backgroundColor = "rgb(48, 48, 48)";
            });
            // on click 
            containerTitle.addEventListener("click", () => {
                const p = composerForm.querySelector("p");
                if (p) p.textContent = title;
                this.delete();
            });
            containerTitle.style.paddingLeft = "2%";
            const titleDiv = document.createElement("div");
            titleDiv.textContent = title;
            containerTitle.appendChild(titleDiv);
            this.container.appendChild(containerTitle);
            if (i !== arr.length - 1) {
                this.container.appendChild(document.createElement("hr"));
            }
        });

        composerForm.prepend(this.container);
    }

    delete() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
}