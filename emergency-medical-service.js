let isLoggedIn = false;
let currentDoctor = '';

const doctors = {
    'doc1': 'doctor1',
    'doc2': 'doctor2',
    'doc3': 'doctor3',
    'doc4': 'doctor4',
    'doc5': 'doctor5',
    'doc6': 'doctor6',
    'doc7': 'doctor7',
    'doc8': 'doctor8',
    'doc9': 'doctor9',
    'doc10': 'doctor10',
    'doctor': 'doctor123'
};

const patients = [
    { name: "Priyanshu", age: 45, heartRate: 125, oxygenLevel: 94, bloodPressure: "140/90", status: "Critical", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Ravi", age: 32, heartRate: 72, oxygenLevel: 98, bloodPressure: "120/80", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Yash", age: 58, heartRate: 95, oxygenLevel: 92, bloodPressure: "150/95", status: "Warning", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Raghav", age: 28, heartRate: 68, oxygenLevel: 99, bloodPressure: "118/75", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Sayan", age: 65, heartRate: 115, oxygenLevel: 91, bloodPressure: "160/100", status: "Critical", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Ravi", age: 20, heartRate: 72, oxygenLevel: 98, bloodPressure: "120/80", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Aniket", age: 63, heartRate: 72, oxygenLevel: 79, bloodPressure: "120/80", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Soumik", age: 39, heartRate: 72, oxygenLevel: 78, bloodPressure: "120/90", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Shubra", age: 45, heartRate: 72, oxygenLevel: 86, bloodPressure: "120/95", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Maya", age: 19, heartRate: 72, oxygenLevel: 98, bloodPressure: "120/63", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Sanjana", age: 78, heartRate: 72, oxygenLevel: 96, bloodPressure: "120/89", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Yuvraj", age: 56, heartRate: 72, oxygenLevel: 94, bloodPressure: "120/79", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Shayak", age: 45, heartRate: 72, oxygenLevel: 93, bloodPressure: "120/78", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Shubham", age: 18, heartRate: 72, oxygenLevel: 90, bloodPressure: "120/110", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Manshi", age: 16, heartRate: 72, oxygenLevel: 88, bloodPressure: "120/878", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" },
    { name: "Tannu", age: 17, heartRate: 72, oxygenLevel: 99, bloodPressure: "120/80", status: "Stable", lastUpdatedBy: "", lastUpdateTime: "" }
];

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (doctors[username] === password) {
        isLoggedIn = true;
        currentDoctor = `Dr. ${username.charAt(0).toUpperCase() + username.slice(1)}`;
        document.getElementById('doctorName').textContent = currentDoctor;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('loggedInStatus').classList.remove('hidden');
        document.getElementById('loginError').classList.add('hidden');
        updateDashboard();
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function handleLogout() {
    isLoggedIn = false;
    currentDoctor = '';
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loggedInStatus').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    updateDashboard();
}

function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'critical': return 'bg-red-100 text-red-800';
        case 'warning': return 'bg-yellow-100 text-yellow-800';
        case 'stable': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function calculateStatus(heartRate, oxygenLevel) {
    if (heartRate > 120 || oxygenLevel < 92) return "Critical";
    if (heartRate > 100 || oxygenLevel < 95) return "Warning";
    return "Stable";
}

function openEditModal(index) {
    if (!isLoggedIn) return;
    const patient = patients[index];
    document.getElementById('editPatientIndex').value = index;
    document.getElementById('editHeartRate').value = patient.heartRate;
    document.getElementById('editOxygenLevel').value = patient.oxygenLevel;
    document.getElementById('editBloodPressure').value = patient.bloodPressure;
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = document.getElementById('editPatientIndex').value;
    const patient = patients[index];

    const newHeartRate = parseInt(document.getElementById('editHeartRate').value);
    const newOxygenLevel = parseInt(document.getElementById('editOxygenLevel').value);
    const newBloodPressure = document.getElementById('editBloodPressure').value;

    patient.heartRate = newHeartRate;
    patient.oxygenLevel = newOxygenLevel;
    patient.bloodPressure = newBloodPressure;
    patient.status = calculateStatus(newHeartRate, newOxygenLevel);
    patient.lastUpdatedBy = currentDoctor;
    patient.lastUpdateTime = new Date().toLocaleString();

    closeEditModal();
    updateDashboard();
});

function updateDashboard() {
    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = '';

    patients.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-4 border-b-2 border-black">${patient.name}</td>
            <td class="p-4 border-b-2 border-black">${patient.age}</td>
            <td class="p-4 border-b-2 border-black ${patient.heartRate > 100 ? 'text-red-600 font-bold' : ''}">${patient.heartRate} bpm</td>
            <td class="p-4 border-b-2 border-black ${patient.oxygenLevel < 95 ? 'text-red-600 font-bold' : ''}">${patient.oxygenLevel}%</td>
            <td class="p-4 border-b-2 border-black">${patient.bloodPressure}</td>
            <td class="p-4 border-b-2 border-black">
                <span class="px-2 py-1 rounded-full ${getStatusColor(patient.status)}">
                    ${patient.status}
                </span>
            </td>
            <td class="p-4 border-b-2 border-black">${patient.lastUpdatedBy || '-'}</td>
            <td class="p-4 border-b-2 border-black">${patient.lastUpdateTime || '-'}</td>
            <td class="p-4 border-b-2 border-black">
                ${isLoggedIn ? `<button onclick="openEditModal(${index})" class="bg-blue-500 text-white px-2 py-1 neubrutalism hover:bg-blue-600">Edit</button>` : '-'}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

updateDashboard();