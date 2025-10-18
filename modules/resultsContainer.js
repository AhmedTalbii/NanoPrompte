class ResultsContainer {
    constructor() {
        this.container = null;
    }

    show() {
        if (this.container) return;
        const arr = ["title 1", "title 2", "title 3"];
        const composerForm = document.querySelector('form[data-type="unified-composer"]');
        this.container = document.createElement("div");
        this.container.setAttribute("class", "results-prompter-container")
        Object.assign(this.container.style, {
            marginBottom: "10px",
            backgroundColor: "rgb(48, 48, 48)",
            borderRadius: "13px",
            padding: "5px"
        });

        arr.forEach((title, i) => {
            const containerTitle = document.createElement("div");
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