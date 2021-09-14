// Function to listen for file creation
window.onload = (function () {
    // Start with a null jsonFile
    var jsonFile = null,

    // Function to return JSON file from the passed text
    makeJsonFile = function (text) {
        // Create new data Blob of type JSON
        var data = new Blob([text], {type: 'application/json'});

        // If the file already exists, we need to revoke the previous URL to prevent memory leaks
        if (jsonFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        // Create the jsonFile and return it
        jsonFile = window.URL.createObjectURL(data);
        return jsonFile;
    };

    // Store reference to the "create" button
    var create = document.getElementById('create');

    // Listen for clicks on "create" and make a new text file when it is clicked
    create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeJsonFile(window.name);
        link.style.display = 'block';
    }, false);
})();