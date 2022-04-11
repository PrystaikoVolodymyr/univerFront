async function getUsers(keyword) {
    try {
        return await axios.get(`http://localhost:5000/users/`, {
            params: {
                keyword: keyword
            }
        })
    } catch (e) {
        return e.response
    }
}

const input = document.getElementById('myInput')
input.addEventListener('input', async function () {
    const users =  await getUsers(input.value)
    const list = document.getElementById('myUL')
    list.innerHTML = ''

    for (const user of users.data.users) {
        const li = document.createElement('li')
        li.innerText = user.name + '  ' + user.email
        li.addEventListener('click', function () {
                console.log(user)
        })
        list.appendChild(li)
    }
})


