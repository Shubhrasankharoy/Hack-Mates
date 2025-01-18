
const firebaseConfig = {
    apiKey: "AIzaSyB9utGKsSRxTblN5IJgq9u8gzNPyFtNTKI",
    authDomain: "showdown-8c6f2.firebaseapp.com",
    projectId: "showdown-8c6f2",
    storageBucket: "showdown-8c6f2.firebasestorage.app",
    messagingSenderId: "346675153216",
    appId: "1:346675153216:web:2a6f91d3417f4ed0ce12a5",
    measurementId: "G-5Z4WWN48FQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let patients = [];

document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patient = {
        name: e.target.elements[0].value,
        age: e.target.elements[1].value,
        emergency_type: e.target.elements[2].value,
        symptoms: e.target.elements[3].value,
        triageLevel: e.target.elements[4].value,
        status: "Waiting"
    };
    
    patients.push(patient);
    updatePatientList();
    e.target.reset();
});

function updatePatientList() {
    const patientList = document.getElementById('patientList');
    patients.sort((a, b) => a.triageLevel - b.triageLevel);
    
    for (let i = 0; i < patients.length; i++) {
        const object = patients[i];
        console.log(object.age);
    }

    patientList.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>Level ${patient.triageLevel}</td>
            <td>${patient.status}</td>
        </tr>
    `).join('');
}