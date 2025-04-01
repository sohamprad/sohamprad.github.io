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
        event.preventDefault(); // Prevents form from submitting the traditional way

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
            courses.push(input.value);
        });

        // Convert uploaded image to a preview URL
        let imagePreview = "";
        if (image) {
            imagePreview = `<img src="${URL.createObjectURL(image)}" alt="${imageCaption}" width="200">`;
        }

        // Generate the new content
        const outputHTML = `
            <h2>Welcome, ${name}!</h2>
            <h3>Your Mascot: ${mascot}</h3>
            ${imagePreview}
            <p><strong>Image Caption:</strong> ${imageCaption}</p>
            <p><strong>Personal Background:</strong> ${personalBackground}</p>
            <p><strong>Professional Background:</strong> ${professionalBackground}</p>
            <p><strong>Academic Background:</strong> ${academicBackground}</p>
            <p><strong>Web Development Background:</strong> ${webDevBackground}</p>
            <p><strong>Primary Computer Platform:</strong> ${computerPlatform}</p>
            <p><strong>Courses Currently Taking:</strong> ${courses.length > 0 ? courses.join(", ") : "None"}</p>
            <p><strong>Funny Thing:</strong> ${funnyThing}</p>
            <p><strong>Additional Comments:</strong> ${comments}</p>
        `;

        // Replace form with output
        form.innerHTML = outputHTML;
    });
});