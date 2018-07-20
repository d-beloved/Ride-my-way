let navToggler = document.getElementById('navbar-toggler');
let navCollapse = document.getElementById('navbar-collapse');

const toggleNav = () => {
  console.log('clicked');
  navCollapse.classList.toggle('navbar-show');
}

navToggler.addEventListener('click', toggleNav);
