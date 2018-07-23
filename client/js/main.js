/* eslint-disable no-undef, no-unused-vars */
const logout = document.getElementById('logout');
const navToggler = document.getElementById('navbar-toggler');
const navCollapse = document.getElementById('navbar-collapse');

const toggleNav = () => {
  console.log('clicked');
  navCollapse.classList.toggle('navbar-show');
}

const clearMessage = () => {
  window.setTimeout(() => {
    alertLog.classList.remove('fail');
    alertLog.classList.remove('success');
    alertLog.style.display = 'none';
  }, 4000);
};

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

navToggler.addEventListener('click', toggleNav);
logout.addEventListener('click', logoutUser);