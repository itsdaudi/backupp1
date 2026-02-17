    // Business Logic for Place
function Place(location, landmarks, timeOfYear, notes = '', rating = 0, imageUrl = '') {
    // Test 1.3: Validate required fields
    if (!location || !landmarks || !timeOfYear) {
        throw new Error('Location, landmarks, and time of year are required');
    }
    
    // Test 1.4: Validate rating
    if (rating < 0 || rating > 5) {
        throw new Error('Rating must be between 0 and 5');
    }
    
    // Test 1.1: Set properties
    this.location = location;
    this.landmarks = Array.isArray(landmarks) ? landmarks : [landmarks];
    this.timeOfYear = timeOfYear;
    this.notes = notes;
    this.rating = rating;
    this.imageUrl = imageUrl;
    
    // Test 1.2: Auto-generated properties
    this.dateAdded = new Date().toISOString();
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Test 2.3: Add to prototype
Place.prototype.getDetails = function() {
    return `
        Location: ${this.location}
        Landmarks: ${this.landmarks.join(', ')}
        Time of Year: ${this.timeOfYear}
        Rating: ${'★'.repeat(this.rating)}${'☆'.repeat(5 - this.rating)}
        Notes: ${this.notes}
        Date Added: ${new Date(this.dateAdded).toLocaleDateString()}
    `;
};

Place.prototype.toHTML = function() {
    // Test 2.2: Return valid HTML
    return `
        <div class="place-details-content">
            ${this.imageUrl ? `<img src="${this.imageUrl}" alt="${this.location}">` : ''}
            <h2>${this.location}</h2>
            <div class="detail-grid">
                <!-- HTML structure for details -->
            </div>
        </div>
    `;
};

const placesCollection = [];

function addPlace(...args) {
    try {
        // Test 3.1: Add to collection
        const newPlace = new Place(...args);
        placesCollection.push(newPlace);
        return newPlace;
    } catch (error) {
        console.error('Error adding place:', error);
        return null;
    }
}

function findPlaceByLocation(location) {
    // Test 3.2: Case-insensitive search
    return placesCollection.find(place => 
        place.location.toLowerCase().includes(location.toLowerCase())
    );
}

function findPlaceById(id) {
    // Test 3.3: Find by ID
    return placesCollection.find(place => place.id === id);
}

function removePlace(id) {
    // Test 3.4: Remove from collection
    const index = placesCollection.findIndex(place => place.id === id);
    if (index !== -1) {
        return placesCollection.splice(index, 1).length > 0;
    }
    return false;
}

function renderPlacesList() {
    // Test 4.1: Update DOM
    const placesList = document.getElementById('places-list');
    // ... render logic
}

function selectPlace(placeId) {
    // Test 4.2: Display details
    const place = findPlaceById(placeId);
    if (place) {
        document.getElementById('place-details').innerHTML = place.toHTML();
    }
}

function updateStats() {
    // Test 4.3: Update statistics
    document.getElementById('places-count').textContent = 
        `Total Places: ${placesCollection.length}`;
}

// Test 4.4: Form submission
document.getElementById('place-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // ... form handling logic
    renderPlacesList();
    updateStats();
});

function runAllTests() {
    console.log('=== Running All Tests ===');
    console.log('Test Suite 1 - Place Constructor:');
    console.log(testConstructor() ? '✓ Passed' : '✗ Failed');
    
    console.log('\nTest Suite 2 - Prototype Methods:');
    console.log(testPrototypeMethods() ? '✓ Passed' : '✗ Failed');
    
    console.log('\nTest Suite 3 - Collection Management:');
    console.log(testCollectionManagement() ? '✓ Passed' : '✗ Failed');
    
    console.log('\nTest Suite 4 - UI Functions:');
    console.log(testUIFunctions() ? '✓ Passed' : '✗ Failed');
}

// Individual test functions
function testConstructor() {
    try {
        const place = new Place('Test', ['Landmark'], 'Winter', 'Test note', 3, 'test.jpg');
        return place.location === 'Test' && 
               place.landmarks.length === 1 &&
               place.timeOfYear === 'Winter';
    } catch (e) {
        return false;
    }
}

// Add more test functions for each suite...



