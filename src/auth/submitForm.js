export async function submitForm(event) {
    const endpoint = `/api/auth/signin/email`;

    event.preventDefault();

    const form = event.target;

    const email = form.email.value;

    // validate email
    if (!email) {
        return false;
    }

    // regex test email
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!emailRegex.test(email)) {
        return false;
    }

    const csrfToken = form.token.value;

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(
            {
                email,
                csrfToken
            }
        ),
    });

    if (res.status === 200) {
        window.location.href = "/verify";
    }

    return true;
};