// ------------------------------
// LOAD USER DATA FROM LOCALSTORAGE
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("userName") || "John Doe";
    const storedEmail = localStorage.getItem("userEmail") || "john.doe@example.com";

    // Update profile header
    document.getElementById("userName").textContent = storedName;
    document.getElementById("userEmail").textContent = storedEmail;

    // Update personal info section
    document.getElementById("infoName").textContent = storedName;
    document.getElementById("infoEmail").textContent = storedEmail;
});

// -------------------------------------------------------
// EDIT PROFILE BUTTON – OPENS A SIMPLE INLINE FORM
// -------------------------------------------------------

document.getElementById("editProfileBtn").addEventListener("click", () => {
    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("userEmail");

    const currentName = nameElement.textContent;
    const currentEmail = emailElement.textContent;

    // Create popup form
    const popup = document.createElement("div");
    popup.className = "edit-popup";
    popup.style.cssText = `
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 25px;
        width: 420px;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 9999;
    `;

    popup.innerHTML = `
        <h2>Edit Profile</h2>

        <label>Full Name</label>
        <input id="editName" type="text" value="${currentName}" 
               style="width:100%; padding:10px; margin-bottom:10px; border-radius:6px; border:1px solid #ccc;">

        <label>Email</label>
        <input id="editEmail" type="email" value="${currentEmail}"
               style="width:100%; padding:10px; margin-bottom:10px; border-radius:6px; border:1px solid #ccc;">

        <div style="display:flex; justify-content:space-between; margin-top:15px;">
            <button id="cancelEdit" style="
                padding:8px 14px;
                background:#ccc;
                border:none;
                border-radius:6px;
                font-weight:600;
            ">Cancel</button>

            <button id="saveEdit" style="
                padding:8px 14px;
                background:#2E4BFF;
                color:white;
                border:none;
                border-radius:6px;
                font-weight:600;
            ">Save</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Cancel edit
    document.getElementById("cancelEdit").onclick = () => popup.remove();

    // Save update
    document.getElementById("saveEdit").onclick = () => {
        const newName = document.getElementById("editName").value;
        const newEmail = document.getElementById("editEmail").value;

        // Update UI
        document.getElementById("userName").textContent = newName;
        document.getElementById("userEmail").textContent = newEmail;
        document.getElementById("infoName").textContent = newName;
        document.getElementById("infoEmail").textContent = newEmail;

        // Save to localStorage
        localStorage.setItem("userName", newName);
        localStorage.setItem("userEmail", newEmail);

        popup.remove();
    };
});
// --------------------------------------
// LOGOUT BUTTON (Redirect to index.html)
// --------------------------------------
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Redirect to home page instead of login page
    window.location.href = "index.html";
});

