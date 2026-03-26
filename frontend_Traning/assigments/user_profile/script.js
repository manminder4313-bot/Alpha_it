
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const elements = {
    usersListSection: document.getElementById('users-list-section'),
    loader: document.getElementById('list-loader'),
    
    createBtn: document.getElementById('create-btn'),
    
    // Full Profile Modal
    profileModal: document.getElementById('profile-modal'),
    closeProfileModal: document.getElementById('close-modal'),
    profileForm: document.getElementById('profile-form'),
    modalTitle: document.getElementById('modal-title'),
    userIdInput: document.getElementById('user-id'),
    nameInput: document.getElementById('name'),
    emailInput: document.getElementById('email'),
    companyInput: document.getElementById('company'),
    submitBtn: document.getElementById('submit-btn'),

    // Patch Modal
    patchModal: document.getElementById('patch-modal'),
    closePatchModal: document.getElementById('close-patch-modal'),
    patchForm: document.getElementById('patch-form'),
    patchUserIdInput: document.getElementById('patch-user-id'),
    patchEmailInput: document.getElementById('patch-email'),
};

let users = [];

// Show Toast Notification
function showToast(message, type = 'info', method = 'INFO') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if(type === 'success') icon = 'fa-check-circle';
    if(type === 'error') icon = 'fa-exclamation-circle';
    if(type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="toast-method">${method}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// 1. VIEW PROFILE (GET)
async function fetchUsers() {
    elements.usersListSection.innerHTML = '<div class="loader" id="list-loader"></div>';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        users = data.slice(0, 2); // Just taking 6 for UI neatness
        renderUsers();
        showToast('Users loaded successfully', 'success', 'GET');
    } catch (error) {
        showToast('Failed to fetch users', 'error', 'GET');
    }
}

function renderUsers() {
    elements.usersListSection.innerHTML = '';
    users.forEach(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="avatar">${initials}</div>
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>@${user.username || user.name.split(' ')[0].toLowerCase()}</p>
                </div>
            </div>
            <div class="user-details">
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-building"></i> ${user.company?.name || user.company || 'N/A'}</p>
            </div>
            <div class="card-actions">
                <button class="action-btn edit" onclick="openEditModal(${user.id})">
                    <i class="fas fa-edit"></i> Full Edit
                </button>
                <button class="action-btn patch" onclick="openPatchModal(${user.id})">
                    <i class="fas fa-bolt"></i> Quick
                </button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        elements.usersListSection.appendChild(card);
    });
}

// 2. CREATE PROFILE (POST)
async function createUser(userData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const newUser = await response.json();
        // Fallback for mock API
        newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; 
        users.unshift(newUser);
        renderUsers();
        closeModals();
        showToast(`Created profile for ${newUser.name}`, 'success', 'POST');
    } catch (error) {
        showToast('Failed to create user', 'error', 'POST');
    }
}

// 3. UPDATE FULL PROFILE (PUT)
async function updateUser(id, userData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const updatedUser = await response.json();
        
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            renderUsers();
        }
        closeModals();
        showToast(`Updated full profile for ${updatedUser.name}`, 'info', 'PUT');
    } catch (error) {
        showToast('Failed to update user', 'error', 'PUT');
    }
}

// 4. UPDATE ONE FIELD (PATCH)
async function patchUser(id, partialData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(partialData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const patchedUser = await response.json();

        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...partialData };
            renderUsers();
        }
        closeModals();
        showToast(`Patched user email to ${partialData.email}`, 'warning', 'PATCH');
    } catch (error) {
        showToast('Failed to patch user', 'error', 'PATCH');
    }
}

// 5. DELETE PROFILE (DELETE)
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        users = users.filter(u => u.id !== id);
        renderUsers();
        showToast(`Deleted profile ID: ${id}`, 'success', 'DELETE');
    } catch (error) {
        showToast('Failed to delete user', 'error', 'DELETE');
    }
}

// Modal Handlers
function openCreateModal() {
    elements.profileForm.reset();
    elements.userIdInput.value = '';
    elements.modalTitle.textContent = 'Create New Profile';
    elements.submitBtn.textContent = 'Create Profile';
    elements.profileModal.classList.add('active');
}

window.openEditModal = function(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    elements.userIdInput.value = user.id;
    elements.nameInput.value = user.name;
    elements.emailInput.value = user.email;
    elements.companyInput.value = user.company?.name || user.company || '';
    
    elements.modalTitle.textContent = 'Edit Full Profile (PUT)';
    elements.submitBtn.textContent = 'Update Profile';
    elements.profileModal.classList.add('active');
}

window.openPatchModal = function(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    elements.patchUserIdInput.value = user.id;
    elements.patchEmailInput.value = user.email;
    elements.patchModal.classList.add('active');
}

function closeModals() {
    elements.profileModal.classList.remove('active');
    elements.patchModal.classList.remove('active');
}

// Event Listeners
elements.createBtn.addEventListener('click', openCreateModal);
elements.closeProfileModal.addEventListener('click', closeModals);
elements.closePatchModal.addEventListener('click', closeModals);

elements.profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = elements.userIdInput.value;
    const userData = {
        name: elements.nameInput.value,
        email: elements.emailInput.value,
        company: { name: elements.companyInput.value }
    };

    if (id) {
        updateUser(parseInt(id), userData);
    } else {
        createUser(userData);
    }
});

elements.patchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = elements.patchUserIdInput.value;
    const email = elements.patchEmailInput.value;
    patchUser(parseInt(id), { email });
});

// Initial Fetch
document.addEventListener('DOMContentLoaded', fetchUsers);
