import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js';

const { createApp } = Vue

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

createApp({
    data() {
        return {
            isAdmin: false,
            showLoginModal: false,
            loginForm: {
                username: '',
                password: ''
            },
            loginError: false,
            adminCredentials: {
                username: 'staff',
                password: 'password'
            },
            stats: [
                { title: 'Doctors', available: 15, total: 20 },
                { title: 'Nurses', available: 25, total: 30 },
                { title: 'Emergency Rooms', available: 8, total: 10 },
                { title: 'ICU Rooms', available: 5, total: 8 },
                { title: 'Operation Theaters', available: 3, total: 5 },
                { title: 'General Wards', available: 40, total: 50 }
            ],
            supplies: [
                { name: 'Oxygen Cylinders', status: 'Available' },
                { name: 'Blood Units', status: 'Low' },
                { name: 'Ventilators', status: 'Available' },
                { name: 'PPE Kits', status: 'Available' },
                { name: 'Medical Masks', status: 'Low' },
                { name: 'Surgical Equipment', status: 'Available' }
            ],
            lastUpdated: new Date().toLocaleString()
        }
    },
    methods: {
        toggleAdminView() {
            if (this.isAdmin) {
                this.isAdmin = false;
            } else {
                this.showLoginModal = true;
            }
        },
        handleLogin() {
            if (this.loginForm.username === this.adminCredentials.username && 
                this.loginForm.password === this.adminCredentials.password) {
                this.isAdmin = true;
                this.showLoginModal = false;
                this.loginError = false;
                this.loginForm.username = '';
                this.loginForm.password = '';
            } else {
                this.loginError = true;
                setTimeout(() => {
                    this.loginError = false;
                }, 3000);
            }
        },
        updateStat(stat, change) {
            if ((change > 0 && stat.available < stat.total) || 
                (change < 0 && stat.available > 0)) {
                stat.available += change;
                this.lastUpdated = new Date().toLocaleString();
            }
        },
        updateSupply(supply, status) {
            supply.status = status;
            this.lastUpdated = new Date().toLocaleString();
        }
    }
}).mount('#app')