import AES from 'crypto-js/aes.js'
export default defineEventHandler(async event => {
    const { username, password } = await readBody(event)

    const payload = 'stud_num=' + username + '&passwd=' + password + '&x=0&y=0'

    console.log(payload)

    const res = await fetch(process.env.STUDENT_SYSTEM_URL as string, {
        method: 'POST',
        body: payload
    }).then(res => res.text())

    console.log(res)

    const login_state = res.startsWith('<body onload="window.open(\'../univer/query_all_course.login2?date1=')

    if (login_state) {
        console.log(AES.encrypt(username, process.env.CRYPTO_KEY as string).toString())
        setCookie(event, 'un', AES.encrypt(username, process.env.CRYPTO_KEY as string).toString(), {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60
        })
    }

    return {
        login: login_state
    }
})