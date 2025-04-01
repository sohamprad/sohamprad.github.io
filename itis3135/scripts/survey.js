document.addEventListener("DOMContentLoaded", function() {
    const addClassButton = document.getElementById("addClass");
    const deleteClassButton = document.getElementById("deleteClass");
    const classContainer = document.getElementById("classContainer");
    
    function updateDeleteButtonVisibility() {
        deleteClassButton.classList.toggle("hidden", classContainer.childNodes.length === 0);
    }
    
    addClassButton.addEventListener("click", function() {
        const classEntry = document.createElement("div");
        classEntry.classList.add("class-entry");
        
        const classInput = document.createElement("input");
        classInput.type = "text";
        classInput.placeholder = "Enter class name";
        
        const descInput = document.createElement("input");
        descInput.type = "text";
        descInput.placeholder = "Enter class description";
        
        classEntry.appendChild(classInput);
        classEntry.appendChild(descInput);
        classContainer.appendChild(classEntry);
        
        updateDeleteButtonVisibility();
    });
    
    deleteClassButton.addEventListener("click", function() {
        if (classContainer.lastChild) {
            classContainer.removeChild(classContainer.lastChild);
        }
        updateDeleteButtonVisibility();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("intro-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const name = document.getElementById("name").value;
        const mascot = document.getElementById("mascot").value;
        const image = document.getElementById("image").files[0];
        const imageCaption = document.getElementById("image-caption").value;
        const personalBackground = document.getElementById("personal-background").value;
        const professionalBackground = document.getElementById("professional-background").value;
        const academicBackground = document.getElementById("academic-background").value;
        const webDevBackground = document.getElementById("web-dev").value;
        const computerPlatform = document.getElementById("computer-platform").value;
        const funnyThing = document.getElementById("funny").value;
        const comments = document.getElementById("comments").value;

        // Handle courses
        let courses = [];
        document.querySelectorAll(".course-input").forEach((input) => {
            if (input.value.trim() !== "") {
                courses.push(input.value.trim());
            }
        });

        // Convert uploaded image to a preview URL
        let imagePreview = "";
        if (image) {
            imagePreview = `<img src="${URL.createObjectURL(image)}" alt="${imageCaption}" width="200">`;
        }

        // Generate the new content
        const outputHTML = `
            <h2>Welcome, ${name}!</h2>
            <ul>
                ${imagePreview}
                <li><i>Image Caption:</i> ${imageCaption}</li>
                <li><strong>Your Mascot:</strong> ${mascot}</li>
                <li><strong>Personal Background:</strong> ${personalBackground}</li>
                <li><strong>Professional Background:</strong> ${professionalBackground}</li>
                <li><strong>Academic Background:</strong> ${academicBackground}</li>
                <li><strong>Web Development Background:</strong> ${webDevBackground}</li>
                <li><strong>Primary Computer Platform:</strong> ${computerPlatform}</li>
                <li><strong>Courses Currently Taking:</strong>
                    <ul>
                        ${courses.length > 0 ? courses.map((course) => `<li>${course}</li>`).join("") : "<li>None</li>"}
                    </ul>
                </li>
                <li><strong>Funny Thing:</strong> ${funnyThing}</li>
                <li><strong>Additional Comments:</strong> ${comments}</li>
            </ul>
        `;

        // Replace form with output
        form.innerHTML = outputHTML;
    });
});
