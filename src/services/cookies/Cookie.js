class Cookie {
    static setCookie = (cookieName, cookieValue, expireDays = 1) => {
        const d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));

        const expires = "expires="+ d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    static getCookieByName = (cookieName) => {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieData = decodedCookie.split(';');

        for(let i = 0; i < cookieData.length; i++) {
            let cookieInfo = cookieData[i];

            while (cookieInfo.charAt(0) === ' ') {
                cookieInfo = cookieInfo.substring(1);
            }

            if (cookieInfo.indexOf(name) === 0) {
                return cookieInfo.substring(name.length, cookieInfo.length);
            }
        }

        return "";
    }

    static deleteCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default Cookie;
