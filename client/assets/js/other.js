//Toggle  admin or user

const adminToggle = document.getElementById('admin-toggle');
const userToggle = document.getElementById('user-toggle');

adminToggle.addEventListener('click', () => {
  adminToggle.classList.add('bg-purple-600', 'text-white');
  adminToggle.classList.remove('bg-purple-300', 'text-purple-700');

  userToggle.classList.add('bg-purple-300', 'text-purple-700');
  userToggle.classList.remove('bg-purple-600', 'text-white');
});

userToggle.addEventListener('click', () => {
  userToggle.classList.add('bg-purple-600', 'text-white');
  userToggle.classList.remove('bg-purple-300', 'text-purple-700');

  adminToggle.classList.add('bg-purple-300', 'text-purple-700');
  adminToggle.classList.remove('bg-purple-600', 'text-white');
});
