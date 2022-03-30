const signup = async function (email, password) {
    try {
        const response = await axios.post(`http://localhost:5000/auth/sing-in`,
            {
                email: email,
                password: password
            });
        return response
        // console.log(response.data);
    } catch (e) {
        return e.response
        // console.log(e.response.data)
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
                password = this.elements.password.value;

            const placeholders = document.querySelectorAll('.auth-form__placeholder');
            const signIn = await signup(email, password);

            console.log(signIn)
            if (signIn.status === 201) {
                answerContainer.innerHTML = '<span class="text-success">you\'ve been logged successfully</span>';
                localStorage.setItem("email", email);
                window.location.href = "../two-factor-verify/verify.html";
            } else {
                placeholders.forEach(function(placeholder) {
                    placeholder.classList.remove('focus');
                });
                this.elements.email.value = '';
                this.elements.password.value = '';
                answerContainer.innerHTML = '<span class="text-danger">invalid email or password</span>';
            }
        });
    })();
};
