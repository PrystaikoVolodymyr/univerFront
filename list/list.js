async function getUsers(name, surname, tokens) {
    try {
        return await axios.get(`http://localhost:5000/users/`,
            {
                params: {
                name: name,
                surname: surname
            },
                headers: {
                    'tokens': tokens
                }
                }
            )
    } catch (e) {
        return e.response
    }
};

async function checkRefreshToken(tokens) {
    try {
        return await axios.get(`http://localhost:5000/auth/check-refresh`,
            {
                headers: { 'tokens': tokens }
            })

    } catch (e) {
        return e.response
    }
}

const name = document.getElementById('myInput')
const surname = document.getElementById('myInput2')
name.addEventListener('input', async function search() {
    const tokens = localStorage.getItem("tokens");
    const response =  await getUsers(name.value, surname.value, tokens)
    const list = document.getElementById('myUL')
    list.innerHTML = ''

    if (response.status === 201) {
        for (const user of response.data.users) {
            const li = document.createElement('li')
            li.innerText = user.name + '  ' + user.surname
            li.addEventListener('click', function () {
                console.log(user)
            })
            list.appendChild(li)
        }
    } else {
        const verifyResult = await checkRefreshToken(tokens)
        if (verifyResult.status === 401) {
            window.location.href = "../sign-in/signin.html";
        } else {
            localStorage.setItem("tokens",JSON.stringify(verifyResult.data.tokens));
            await search()
        }
    }


})
surname.addEventListener('input', async function search() {
    const tokens = localStorage.getItem("tokens");
    const response =  await getUsers(name.value, surname.value, tokens)
    const list = document.getElementById('myUL')
    list.innerHTML = ''


    if (response.status === 201) {
        for (const user of response.data.users) {
            const li = document.createElement('li')
            li.innerText = user.name + '  ' + user.surname
            li.addEventListener('click', function () {
                console.log(user)
            })
            list.appendChild(li)
        }
    } else {
        const verifyResult = await checkRefreshToken(tokens)
        if (verifyResult.status === 401) {
            window.location.href = "../sign-in/signin.html";
        } else {
            localStorage.setItem("tokens",JSON.stringify(verifyResult.data.tokens));
            await search()
        }
    }
})


