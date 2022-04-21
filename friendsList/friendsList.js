async function getMessages(recipientId, tokens) {
    try {
        return await axios.get(`http://localhost:5000/message/get-message`,
            {
                params: {
                    recipientId: recipientId
                },
                headers: {
                    'tokens': tokens
                }
            }
        )
    } catch (e) {
        return e.response
    }
}

async function userInfo(recipientId, tokens) {
    try {
        return await axios.get(`http://localhost:5000/users/${recipientId}`,
            {
                headers: {
                    'tokens': tokens
                }
            }
        )
    } catch (e) {
        return e.response
    }
}

const sendMsg = async function (recipientId, message, tokens) {
    try {
        return await axios.post(`http://localhost:5000/message/send-message`,
            {
                recipientId: recipientId,
                message: message
            },
            {
                headers: {
                    'tokens': tokens
                }
            })
    } catch (e) {
        return e.response
    }
}

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
const tokens = localStorage.getItem("tokens");
const recipientId = localStorage.getItem("recipientId");


window.onload = async function (){
    const userDetails = await userInfo(recipientId, tokens)
    const response = await getMessages(recipientId, tokens)

    let name = document.getElementById("name");
    let email = document.getElementById("email");

    name.innerHTML = userDetails.data.user.name + " " + userDetails.data.user.surname
    email.innerHTML = userDetails.data.user.email
    if (response.status === 201) {
        for (let i = 0; i < 100; i++) {

        }
        for (const message of response.data.messages) {
            let li = document.createElement("li");
            if (message.recipientId === recipientId) {
                li.className = 'left'
            } else {
                li.className = 'right'
            }
            let lef = document.getElementById("lishko");

            li.innerText = message.message
            lef.after(li);
        }
        const theElement = document.getElementById('message');

        const scrollToBottom = (node) => {
            node.scrollTop = node.scrollHeight;
        }

        scrollToBottom(theElement);
    } else {
        const verifyResult = await checkRefreshToken(tokens)
        if (verifyResult.status === 401) {
            window.location.href = "../sign-in/signin.html";
        } else {
            localStorage.setItem("tokens",JSON.stringify(verifyResult.data.tokens));
            location.reload()
        }
    }
}

const sendBtn = document.getElementById('send-button')

sendBtn.onclick = async function () {
    const message = document.getElementById('message-to-send').value
    console.log(message)
    const sendMessage = await sendMsg(localStorage.getItem("recipientId"), message, tokens);
    if (sendMessage.status === 201) {
        location.reload()
    } else {
        const verifyResult = await checkRefreshToken(tokens)
        if (verifyResult.status === 401) {
            window.location.href = "../sign-in/signin.html";
        } else {
            localStorage.setItem("tokens",JSON.stringify(verifyResult.data.tokens));
            location.reload()
        }
    }
}



