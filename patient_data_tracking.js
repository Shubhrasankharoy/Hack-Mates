let patients = [
    { name: "Mahesh", id: "P12345", age: 45, room: "301", history: "History of hypertension" },
    { name: "Sagnik", id: "P12346", age: 32, room: "302", history: "Type 2 diabetes" },
    { name: "Ankit", id: "P12347", age: 29, room: "303", history: "No significant history" },
    { name: "Trijit", id: "P12348", age: 54, room: "304", history: "Heart condition" },
    { name: "Arjun", id: "P12349", age: 40, room: "305", history: "Asthma" },
    { name: "Agnish", id: "P12350", age: 36, room: "306", history: "Chronic migraines" },
    { name: "Sayan", id: "P12351", age: 22, room: "307", history: "Allergic to peanuts" },
    { name: "Rima", id: "P12352", age: 65, room: "308", history: "Diabetes" },
    { name: "Soumili", id: "P12353", age: 28, room: "309", history: "Anxiety disorder" },
    { name: "Jasmine", id: "P12354", age: 50, room: "310", history: "Hypertension" },
];

let currentPatient = null;
let isAdmin = false;

function updatePatientSelector() {
    const selector = document.getElementById('patientSelector');
    selector.innerHTML = '<option value="">Select Patient</option>';
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = `${patient.name} (${patient.id})`;
        selector.appendChild(option);
    });
}

document.getElementById('patientSelector').addEventListener('change', (e) => {
    if (!e.target.value) return;
    currentPatient = patients.find(p => p.id === e.target.value);
    updatePatientDisplay();
});

function updatePatientDisplay() {
    if (!currentPatient) return;
    document.getElementById('patientName').textContent = currentPatient.name;
    document.getElementById('patientId').textContent = currentPatient.id;
    document.getElementById('patientAge').textContent = currentPatient.age;
    document.getElementById('patientRoom').textContent = currentPatient.room;
    document.getElementById('historyText').value = currentPatient.history;
}

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function toggleLoginModal() {
    if (isAdmin) {
        logout();
        return;
    }
    showModal('loginModal');
}

function showAddPatientModal() {
    showModal('addPatientModal');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        isAdmin = true;
        enableEditing();
        closeModal('loginModal');
        document.getElementById('viewToggle').textContent = 'Switch to Patient View';
        document.getElementById('adminControls').classList.remove('hidden');
        alert('Logged in as Admin');
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    isAdmin = false;
    disableEditing();
    document.getElementById('viewToggle').textContent = 'Switch to Admin View';
    document.getElementById('adminControls').classList.add('hidden');
}

function enableEditing() {
    document.querySelectorAll('.editable').forEach(el => {
        el.contentEditable = true;
        el.classList.add('border', 'border-gray-300', 'p-1');
    });
    document.getElementById('historyText').readOnly = false;
}

function disableEditing() {
    document.querySelectorAll('.editable').forEach(el => {
        el.contentEditable = false;
        el.classList.remove('border', 'border-gray-300', 'p-1');
    });
    document.getElementById('historyText').readOnly = true;
}

function addNewPatient() {
    const newPatient = {
        name: document.getElementById('newPatientName').value,
        id: document.getElementById('newPatientId').value,
        age: document.getElementById('newPatientAge').value,
        room: document.getElementById('newPatientRoom').value,
        history: document.getElementById('newPatientHistory').value
    };

    if (!newPatient.name || !newPatient.id) {
        alert('Name and ID are required');
        return;
    }

    patients.push(newPatient);
    updatePatientSelector();
    closeModal('addPatientModal');
    
    document.getElementById('newPatientName').value = '';
    document.getElementById('newPatientId').value = '';
    document.getElementById('newPatientAge').value = '';
    document.getElementById('newPatientRoom').value = '';
    document.getElementById('newPatientHistory').value = '';
}



updatePatientSelector();