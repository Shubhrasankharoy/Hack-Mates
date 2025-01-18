let patients = [];

document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patient = {
        name: e.target.elements[0].value,
        age: e.target.elements[1].value,
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
    
    patientList.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>Level ${patient.triageLevel}</td>
            <td>${patient.status}</td>
        </tr>
    `).join('');
}