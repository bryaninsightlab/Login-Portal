// Object to store user dashboard info
let userDashboards = {};

// Load dashboards from JSON
fetch("dashboard.json")
    .then(response => response.json())
    .then(data => {
        userDashboards = data;
        console.log("Dashboard configuration loaded successfully");
    })
    .catch(err => {
        console.error("Failed to load dashboard.json", err);
        document.getElementById("error-msg").innerText = "Configuration error. Please contact support.";
    });

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("email").value.toLowerCase().trim();
    const password = document.getElementById("password").value;
    
    // Clear previous error messages
    document.getElementById("error-msg").innerText = "";
    
    if(userDashboards[email]){
        const user = userDashboards[email];
        
        // Check password if defined
        if(user.password && password !== user.password){
            document.getElementById("error-msg").innerText = "Incorrect password. Please try again.";
            return;
        }
        
        // Redirect to user dashboard
        console.log(`Redirecting ${email} to their dashboard`);
        window.location.href = user.dashboard;
    } else {
        document.getElementById("error-msg").innerText = "Invalid email address or no dashboard assigned.";
    }
});
