const button = document.querySelector('#back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        button.classList.remove('disabled');
        button.classList.add('active');
    }
    else {
        button.classList.remove('active');
        button.classList.add('disabled');
    }
});

button.addEventListener('click', function() {
    window.scrollTo(0, 0);
});
