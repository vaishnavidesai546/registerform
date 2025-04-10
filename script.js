
Copy
document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'http://localhost:5000/api/registrations';
  const userTableBody = document.getElementById('userTableBody');
  const userForm = document.getElementById('userForm');
  const modal = document.getElementById('userModal');
  const modalTitle = document.getElementById('modalTitle');
  const addUserBtn = document.getElementById('addUserBtn');
  const closeBtn = document.querySelector('.close');
  const cancelBtn = document.getElementById('cancelBtn');
  
  let isEditMode = false;
  let currentUserId = null;

  // Event Listeners
  addUserBtn.addEventListener('click', openAddUserModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  userForm.addEventListener('submit', handleFormSubmit);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Initial load
  fetchUsers();

  // Functions
  async function fetchUsers() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const users = await response.json();
      displayUsers(users);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching users. See console for details.');
    }
  }

  function displayUsers(users) {
    userTableBody.innerHTML = '';
    
    if (users.length === 0) {
      userTableBody.innerHTML = '<tr><td colspan="4">No users found</td></tr>';
      return;
    }
    
    users.forEach(user => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${user.first_name} ${user.last_name}</td>
        <td>${user.email}</td>
        <td>${new Date(user.date_of_birth).toLocaleDateString()}</td>
        <td>
          <button class="action-btn edit" data-id="${user.id}">Edit</button>
          <button class="action-btn delete" data-id="${user.id}">Delete</button>
        </td>
      `;
      
      userTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.dataset.id));
    });
    
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteUser(btn.dataset.id));
    });
  }

  function openAddUserModal() {
    isEditMode = false;
    currentUserId = null;
    modalTitle.textContent = 'Add New User';
    userForm.reset();
    modal.style.display = 'block';
  }

  async function openEditModal(userId) {
    try {
      const response = await fetch(`${apiUrl}/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      
      const user = await response.json();
      
      isEditMode = true;
      currentUserId = userId;
      modalTitle.textContent = 'Edit User';
      
      document.getElementById('userId').value = user.id;
      document.getElementById('firstName').value = user.first_name;
      document.getElementById('lastName').value = user.last_name;
      document.getElementById('email').value = user.email;
      document.getElementById('dateOfBirth').value = user.date_of_birth.split('T')[0];
      
      modal.style.display = 'block';
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching user data. See console for details.');
    }
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const userData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      dateOfBirth: document.getElementById('dateOfBirth').value
    };
    
    if (Object.values(userData).some(val => !val)) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      let response;
      
      if (isEditMode) {
        response = await fetch(`${apiUrl}/${currentUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      } else {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }
      
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting user. See console for details.');
    }
  }
});