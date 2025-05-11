
const { createApp } = Vue;

(function () {
    emailjs.init({
        publicKey: "R71ziGBLO8_dehXJg",
    });
})();

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
                username: 'admin',
                password: 'admin123'
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
                { name: 'Blood Units', status: 'Available' },
                { name: 'Ventilators', status: 'Available' },
                { name: 'PPE Kits', status: 'Available' },
                { name: 'Medical Masks', status: 'Available' },
                { name: 'Surgical Equipment', status: 'Available' }
            ],
            lastUpdated: new Date().toLocaleString()
        };
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
        },
        send_mail() {
            let param = {
                to_name: 'Ram Biswas',
                from_name: "HOSPITAL MANAGEMENT SYSTEM",
                message: "Alert: One of the supplies is low!",
                to_gmail: 'shubhrasankharoy@gmail.com'
            };

            emailjs.send("service_xu1bvyg", 'template_k2aqsou', param)
                .then(response => {
                    console.log('Email sent successfully:', response.status, response.text);
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                });
        }
    },
    watch: {
        supplies: {
            deep: true,
            handler(newSupplies) {
                const lowSupply = newSupplies.find(supply => supply.status.toLowerCase() === 'low');
                if (lowSupply) {
                    console.log(`Low supply detected: ${lowSupply.name}`);
                    this.send_mail();
                }
            }
        }
    }
}).mount('#app');