function loadImage() {
    var file = document.getElementById("image").files[0];
    const imageURL = URL.createObjectURL(file);
    var text = "<img src=\"" + imageURL + "\"> "; 

    const fileType = file.type;
    if (fileType === "image/png" || fileType === "image/jpeg") {
        document.getElementById('loadImage').innerHTML = text;
    } else {
        document.getElementById('loadImage').textContent = "Invalid file type. Please upload a PNG or JPG.";
    }

    
}

document.getElementById('introForm').addEventListener('submit', function(event) {
    let isValid = true;
    const requiredFields = document.querySelectorAll('#introForm [required]');
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.border = "2px solid red";
        } else {
            field.style.border = "";
        }
    });
    
    if (!isValid) {
        alert("Please fill out all required fields before submitting.");
        event.preventDefault();
    }
});


document.getElementById('reset-form').addEventListener('click', function() {
    document.getElementById('introForm').reset();
    const requiredFields = document.querySelectorAll('#introForm [required]');
    requiredFields.forEach((field) => {
        field.style.border = "";
    });
});


function onClick() {
    const container = document.getElementById('classContainer');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-entry';
    
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter course name';
    newInput.className = 'courseInput';
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.type = 'button';
    deleteButton.onclick = function() {
        container.removeChild(courseDiv);
    };
    
    courseDiv.appendChild(newInput);
    courseDiv.appendChild(deleteButton);
    container.appendChild(courseDiv);
}