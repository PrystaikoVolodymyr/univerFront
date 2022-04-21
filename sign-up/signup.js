const signup = async function (email, password, name, surname, phone) {
    try {
        return await axios.post(`http://localhost:5000/auth/sing-up`,
            {
                email: email,
                password: password,
                name: name,
                phone: phone,
                surname: surname
            })
    } catch (e) {
        console.log(e)
        return e.response
    }

}
window.onload = function() {
    (function() {
        const inputText = document.querySelectorAll('.auth-form__input');

        inputText.forEach( function(input) {
            input.addEventListener('focus', function() {
                this.classList.add('focus');
                this.parentElement.querySelector('.auth-form__placeholder').classList.add('focus');
            });
            input.addEventListener('blur', function() {
                this.classList.remove('focus');
                if (! this.value) {
                    this.parentElement.querySelector('.auth-form__placeholder').classList.remove('focus');
                }
            });
        });
    })();

    (function() {
        const togglers = document.querySelectorAll('.password-toggler');

        togglers.forEach( function(checkbox) {
            checkbox.addEventListener('change', function() {

                const toggler = this.parentElement,
                    input   = toggler.parentElement.querySelector('.input-password'),
                    icon    = toggler.querySelector('.auth-form__icon');

                if (checkbox.checked) {
                    input.type = 'text';
                    icon.classList.remove('la-eye')
                    icon.classList.add('la-eye-slash');
                }

                else
                {
                    input.type = 'password';
                    icon.classList.remove('la-eye-slash')
                    icon.classList.add('la-eye');
                }
            });
        });
    })();

    ( function() {

        document.forms['form-auth'].addEventListener('submit', async function(e) {
            e.preventDefault();
            let loader = document.getElementById('loader')
            let loader_inner = document.getElementById('loader_inner')

            loader.style.display = 'block'


            const answerContainer = this.querySelector('.auth-form__answer'),
                email = this.elements.email.value,
                password = this.elements.password.value,
                name = this.elements.name.value,
                surname = this.elements.surname.value,
                phone = this.elements.phone.value;

            console.log(email)
            console.log(password)
            console.log(name)
            console.log(surname)
            console.log(phone)

            const signUp = await signup(email, password, name, surname, phone);

            console.log(signUp)
            if (signUp.status === 201) {
                window.location.href = "../sign-in/signin.html";
            } else {
                console.log(signUp)
                location.reload()
            }
        });
    })();
};
