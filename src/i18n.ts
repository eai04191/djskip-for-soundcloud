import { browser } from "webextension-polyfill-ts";

export default function apply() {
    for (const e of <HTMLElement[]>[...document.querySelectorAll("*")]) {
        const match = e.innerText.trim().match(/^__MSG_(.+)__$/);
        if (match) {
            const key = match[1];
            const message = browser.i18n.getMessage(key);
            if (message !== "") e.innerText = message;
            else console.log(key + " is not found.");
        }
    }
}
