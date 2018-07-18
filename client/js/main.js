let navToggler = document.getElementById('navbar-toggler');
let navCollapse = document.getElementById('navbar-collapse');

const toggleNav = () => {
  console.log('clicked');
  navCollapse.classList.toggle('navbar-show');
}

navToggler.addEventListener('click', toggleNav);

const checkform = () => {
  let form1 = document.getElementById('my-form');
  if(form1.password.value != form1.confirmPassword.value)
  {
    alert("Passwords must be the same");
    form1.password.focus();
    return false;
  }
  return true;
}