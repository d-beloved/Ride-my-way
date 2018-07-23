/* eslint-disable no-undef, no-unused-vars */
const logout = document.getElementById('logout');
const navToggler = document.getElementById('navbar-toggler');
const navCollapse = document.getElementById('navbar-collapse');

const toggleNav = () => {
  console.log('clicked');
  navCollapse.classList.toggle('navbar-show');
}

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

navToggler.addEventListener('click', toggleNav);
logout.addEventListener('click', logoutUser);