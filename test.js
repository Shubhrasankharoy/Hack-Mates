import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyB9utGKsSRxTblN5IJgq9u8gzNPyFtNTKI",
    authDomain: "showdown-8c6f2.firebaseapp.com",
    projectId: "showdown-8c6f2",
    storageBucket: "showdown-8c6f2.firebasestorage.app",
    messagingSenderId: "346675153216",
    appId: "1:346675153216:web:2a6f91d3417f4ed0ce12a5",
    measurementId: "G-5Z4WWN48FQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Sample data structure for patients
let patients = [];

// Function to get data from Firebase Realtime Database
async function getData() {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, 'patient'));
    if (snapshot.exists()) {
        const data = snapshot.val();
        patients = Object.values(data);
    } else {
        console.log("No data available");
    }
}

// Function to update patient list
function updatePatientList() {
    const patientList = document.getElementById('patientList');
    patients.sort((a, b) => a.triageLevel - b.triageLevel);
    
    patientList.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>Level ${patient.triageLevel}</td>
            <td>${patient.status}</td>
        </tr>
    `).join('');
}

// Event listener for patient form submission
document.getElementById('patientForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patient = {
        patient_id: "P" + Math.floor(1000 + Math.random() * 9000),
        name: formData.get('name'),
        age: formData.get('age'),
        emergency_type: formData.get('emergency-type'),
        symptoms: formData.get('symptoms'),
        triageLevel: formData.get('triage-level'),
        status: "Waiting"
    };
    
    patients.push(patient);
    await updateFirebaseData();
    updatePatientList();
    e.target.reset();
});

// Function to update Firebase Realtime Database
async function updateFirebaseData() {
    const db = getDatabase();
    for (let i = 0; i < patients.length; i++) {
        const object = patients[i];
        await set(ref(db, 'patient/' + object.patient_id), {
            patient_id: object.patient_id,
            name: object.name,
            age: object.age,
            emergency_type: object.emergency_type,
            symptoms: object.symptoms,
            triageLevel: object.triageLevel,
            status: object.status
        });
    }
}

// Main function to get data and update patient list
async function main() {
    await getData();
    updatePatientList();
}

main();