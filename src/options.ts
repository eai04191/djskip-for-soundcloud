import { browser } from "webextension-polyfill-ts";
import i18n from "./i18n";
i18n();

const defaultOptions = {
    autoSkipWords: [
        "Preview",
        "Demo",
        "XFD",
        "X-fade",
        "Xfade",
        "Crossfade",
        "Cross fade",
        "クロスフェード",
    ],
    autoSkipLength: 10,
    useAutoSkipByWords: true,
    useAutoSkipByLength: true,
    scanTitle: true,
    scanPermalink: true,
};

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        autoSkipWords: (<HTMLInputElement>(
            document.querySelector("#autoSkipWords")
        )).value,
        autoSkipLength: (<HTMLInputElement>(
            document.querySelector("#autoSkipLength")
        )).value,
        useAutoSkipByLength: (<HTMLInputElement>(
            document.querySelector("#useAutoSkipByLength")
        )).value,
        useAutoSkipByWords: (<HTMLInputElement>(
            document.querySelector("#useAutoSkipByWords")
        )).value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#color").value = result.color || "blue";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = chrome.storage.local.get("color");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
