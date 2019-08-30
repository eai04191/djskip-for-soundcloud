const bodyObserver = new MutationObserver(() => searchMiniplayer());
bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
});

function searchMiniplayer() {
    console.log("body has changed. now element search time...");
    const playbackSoundBadge = document.querySelector(
        "[aria-label='miniplayer'] .playbackSoundBadge"
    );
    if (playbackSoundBadge) {
        console.log("I found it!", playbackSoundBadge);
        bodyObserver.disconnect();

        const miniplayerObserver = new MutationObserver(() => fook());
        miniplayerObserver.observe(playbackSoundBadge, {
            childList: true,
            subtree: true,
        });
    } else {
        console.log("Not found :(");
    }
}

function fook() {
    console.log("playbackSoundBadge is changed");
    const controls = document.querySelector(".playControls");

    const isPlaying = controls.querySelector(".playing");
    const title = (<HTMLElement>(
        controls.querySelector(
            ".playbackSoundBadge__titleLink span[aria-hidden='true']"
        )
    )).innerText;
    const link = controls
        .querySelector(".playbackSoundBadge__titleLink")
        .getAttribute("href");
    const dulation = timeToSec(
        (<HTMLElement>(
            controls.querySelector(
                ".playbackTimeline__duration span[aria-hidden='true']"
            )
        )).innerText
    );

    // 10分以上の場合スキップ
    if (dulation >= 10 * 60) {
        skip(title, "Duration is over than 10 min");
    }

    const skipWords = [
        "Preview",
        "Demo",
        "XFD",
        "X-fade",
        "Xfade",
        "Crossfade",
        "Cross fade",
        "クロスフェード",
    ];

    const hit = skipWords.find(str =>
        title.toLocaleLowerCase().includes(str.toLocaleLowerCase())
    );

    if (hit && isPlaying) {
        skip(title, `The title has contained Skip word (${hit})`);
    }
}

function skip(title, reason) {
    console.log("Auto Skip: " + title);
    console.log("Reason: " + reason);
    (<HTMLElement>(
        document.querySelector(".playControls .playControls__next")
    )).click();
}

function timeToSec(string) {
    const iterator = string
        .split(":")
        .map(e => parseInt(e))
        .reverse()
        .entries();

    let sec = 0;

    for (;;) {
        const result = iterator.next();
        if (result.done) break;
        sec += 60 ** result.value[0] * result.value[1];
    }

    return sec;
}
