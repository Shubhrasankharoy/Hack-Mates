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

let patients = [];

 async function getdata() {
    // const patientList = document.getElementById('patientList');
    const dbRef = ref(getDatabase());
    get(child(dbRef, `patient`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data1 = snapshot.val();

            for (const element of Object.values(data1)) {
                console.log(element);
                patients.push(element);            
            }
            /* patientList.innerHTML = patients.map(patient => `
                <tr>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>Level ${patient.triageLevel}</td>
                    <td>${patient.status}</td>
                </tr>
            `).join(''); */

            console.log(patients.length);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


document.getElementById('patientForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const patient = {
        'patient_id': "P" + Math.floor(1000 + Math.random() * 9000),
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
        const db = getDatabase();
        set(ref(db, 'patient/' + object.patient_id), {
            'patient_id': object.patient_id,
            name: object.name,
            age: object.age,
            emergency_type: object.emergency_type,
            symptoms: object.symptoms,
            triageLevel: object.triageLevel,
            status: object.status
        }).then(() => {
            console.log('Done...');
        });
    }

    patientList.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>Level ${patient.triageLevel}</td>
            <td>${patient.status}</td>
        </tr>
    `).join('');
    console.log(patients);
    console.log("hiiii");
}

async function main(){
    // await getdata();
    updatePatientList();
}

main();