document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var numRooms = document.getElementById('num_rooms').value;
    var numPeople = document.getElementById('num_people').value;
    var isAC = document.getElementById('is_ac').value === 'yes';
    var isTV = document.getElementById('is_tv').value === 'yes';
    var numChildren = document.getElementById('num_children').value;
    var isUrban = document.getElementById('is_urban').value === 'yes';

    // Create a data object to send in the POST request
    var data = {
        num_rooms: numRooms,
        num_people: numPeople,
        is_ac: isAC,
        is_tv: isTV,
        num_children: numChildren,
        is_urban: isUrban
    };

    // Make the POST request to the server
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Display the estimated price in the result <div>
        document.getElementById('result').textContent = 'Estimated Price: ₹ ' + data.estimated_price ;

        // Store the form values in localStorage
        localStorage.setItem('num_rooms', numRooms);
        localStorage.setItem('num_people', numPeople);
        localStorage.setItem('is_ac', isAC ? 'yes' : 'no');
        localStorage.setItem('is_tv', isTV ? 'yes' : 'no');
        localStorage.setItem('num_children', numChildren);
        localStorage.setItem('is_urban', isUrban ? 'yes' : 'no');
    })
    .catch(function(error) {
        console.log('Error:', error);
    });

    // Reset the form
    document.querySelector('form').reset();
});

// Populate the form with stored values from localStorage
document.getElementById('num_rooms').value = localStorage.getItem('num_rooms');
document.getElementById('num_people').value = localStorage.getItem('num_people');
document.getElementById('is_ac').value = localStorage.getItem('is_ac');
document.getElementById('is_tv').value = localStorage.getItem('is_tv');
document.getElementById('num_children').value = localStorage.getItem('num_children');
document.getElementById('is_urban').value = localStorage.getItem('is_urban');
