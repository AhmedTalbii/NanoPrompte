class ResultsContainer {
    show() {
        const composerForm = document.querySelector(
            'form[data-type="unified-composer"]'
        );
        const container = document.createElement("div");
        
        composerForm.prepend(container)
    }
    delete() {

    }
}