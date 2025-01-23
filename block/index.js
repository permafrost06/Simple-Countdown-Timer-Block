const __ = wp.i18n.__;
const { createElement: h, useEffect, useState } = window.React;
const { useBlockProps, InspectorControls } = window.wp.blockEditor
const { PanelBody, DateTimePicker } = window.wp.components
const registerBlockType = window.wp.blocks.registerBlockType;

function getTimeDifference(startTime, endTime) {
    if (endTime < startTime) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const diffInMs = Math.abs(new Date(endTime) - new Date(startTime));
    let totalSeconds = Math.floor(diffInMs / 1000);
    const days = String(Math.floor(totalSeconds / (24 * 60 * 60))).padStart(2, '0');
    totalSeconds %= 24 * 60 * 60;
    const hours = String(Math.floor(totalSeconds / (60 * 60))).padStart(2, '0');
    totalSeconds %= 60 * 60;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return { days, hours, minutes, seconds };
}

function edit({ attributes, setAttributes }) {
    const { targetTime } = attributes;

    const timePicker = h(
        DateTimePicker,
        {
            currentDate: (targetTime === "0") ? new Date() : targetTime,
            onChange: (newTime) => {
                setAttributes({ targetTime: newTime });
            }
        }
    );

    const panelBody = h(PanelBody, { title: "Settings", }, timePicker);

    const inspectorControls = h(InspectorControls, {}, panelBody);

    const [currentTime, setCurrentTime] = useState(new Date().toISOString());

    const { days, hours, minutes, seconds } = getTimeDifference(
        currentTime,
        targetTime
    );

    const countdown = h(
        "div",
        { "class": "timer-container" },
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, days),
            h("div", null, "DAYS")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, hours),
            h("div", null, "HOURS")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, minutes),
            h("div", null, "MINUTES")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, seconds),
            h("div", null, "SECONDS")
        )
    );

    useEffect(() => {
        const int = setInterval(() => {
            setCurrentTime(new Date().toISOString());
        }, 1000);

        return () => clearInterval(int);
    }, []);

    return h("div", useBlockProps(), inspectorControls, countdown);
}
function save({ attributes }) {
    const { targetTime } = attributes;

    const { days, hours, minutes, seconds } = getTimeDifference(
        new Date().toISOString(),
        targetTime
    );

    const countdown = h(
        "div",
        { "class": "timer-container", "data-target-time": targetTime },
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, days),
            h("div", null, "DAYS")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, hours),
            h("div", null, "HOURS")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, minutes),
            h("div", null, "MINUTES")
        ),
        h("div", { "class": "sep" }, ":"),
        h(
            "div",
            { "class": "unit" },
            h("div", { "class": "value" }, seconds),
            h("div", null, "SECONDS")
        )
    );

    return h("div", useBlockProps.save(), countdown);
}

(function() {
    registerBlockType("permafrost06/countdown-timer", {
        edit,
        save,
    });
})();
