function addClassInputFeature() {
    document.addEventListener("DOMContentLoaded", function () {
        const container = document.getElementById("class-container");
        const addButton = document.getElementById("add-class-button");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Last Class";
        deleteButton.id = "delete-class-button";
        deleteButton.style.display = "none";
        document.body.appendChild(deleteButton);

        function updateDeleteButtonVisibility() {
            deleteButton.style.display = container.getElementsByClassName("class-input").length > 0 ? "block" : "none";
        }
        
        addButton.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter class name";
            input.classList.add("class-input");
            container.appendChild(input);
            updateDeleteButtonVisibility();
        });
        
        deleteButton.addEventListener("click", function () {
            const inputs = container.getElementsByClassName("class-input");
            if (inputs.length > 0) {
                container.removeChild(inputs[inputs.length - 1]);
                updateDeleteButtonVisibility();
            }
        });
    });
}