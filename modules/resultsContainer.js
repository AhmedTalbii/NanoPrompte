class ResultsContainer {
    constructor() {
        this.container = null;
    }

    show(arr) {
        if (this.container) return;
        const composerForm = document.querySelector(chatSelectors[host]);
        this.container = document.createElement("div");
        this.container.setAttribute("class", "results-prompter-container");
        Object.assign(this.container.style, {
            position: "relative",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            marginBottom: "10px",
            backgroundColor: "rgb(48, 48, 48)",
            borderRadius: "13px",
            padding: "5px"
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        Object.assign(deleteBtn.style, {
            position: "absolute",
            top: "5px",
            right: "10px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px"
        });
        deleteBtn.addEventListener("click", () => this.delete());
        this.container.appendChild(deleteBtn);

        arr.forEach((title, i) => {
            const containerTitle = document.createElement("div");
            Object.assign(containerTitle.style, {
                maxHeight: "40px",
                overflowY: "auto",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                cursor: "pointer",
                borderRadius: "5px",
                paddingLeft: "2%"
            });

            containerTitle.addEventListener("mouseover", () => {
                containerTitle.style.backgroundColor = "rgba(24, 24, 24, 1)";
            });
            containerTitle.addEventListener("mouseout", () => {
                containerTitle.style.backgroundColor = "rgb(48, 48, 48)";
            });
            containerTitle.addEventListener("click", () => {
                const p = composerForm.querySelector("p");
                if (p) p.textContent = title;
                this.delete();
            });

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
