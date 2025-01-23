(function() {
    const __ = wp.i18n.__;
    const { createElement, useEffect, useState } = window.React;
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

    registerBlockType("permafrost06/countdown-timer", {
        edit: function({ attributes, setAttributes }) {
            const { targetTime } = attributes;

            const timePicker = createElement(
                DateTimePicker,
                {
                    currentDate: (targetTime === "0") ? new Date() : targetTime,
                    onChange: (newTime) => {
                        setAttributes({ targetTime: newTime });
                    }
                }
            );

            const panelBody = createElement(
                PanelBody,
                {
                    title: __("Settings", "permafrost-countdown-plugin"),
                },
                timePicker
            );

            const inspectorControls = createElement(
                InspectorControls,
                {},
                panelBody
            );

            const [currentTime, setCurrentTime] = useState(new Date().toISOString());

            const { days, hours, minutes, seconds } = getTimeDifference(currentTime, targetTime);

            const countdown = createElement(
                "div",
                { "class": "timer-container" },
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        days
                    ),
                    createElement(
                        "div",
                        null,
                        "DAYS"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        hours
                    ),
                    createElement(
                        "div",
                        null,
                        "HOURS"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        minutes
                    ),
                    createElement(
                        "div",
                        null,
                        "MINUTES"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        seconds
                    ),
                    createElement(
                        "div",
                        null,
                        "SECONDS"
                    )
                )
            );

            useEffect(() => {
                const int = setInterval(() => {
                    setCurrentTime(new Date().toISOString());
                }, 1000);

                return () => clearInterval(int);
            }, []);

            return createElement(
                "div",
                useBlockProps(),
                inspectorControls,
                countdown,
            );
        },
        save: function({ attributes }) {
            const { targetTime } = attributes;

            const { days, hours, minutes, seconds } = getTimeDifference(new Date().toISOString(), targetTime);

            const countdown = createElement(
                "div",
                { "class": "timer-container", "data-target-time": targetTime },
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        days
                    ),
                    createElement(
                        "div",
                        null,
                        "DAYS"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        hours
                    ),
                    createElement(
                        "div",
                        null,
                        "HOURS"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        minutes
                    ),
                    createElement(
                        "div",
                        null,
                        "MINUTES"
                    )
                ),
                createElement(
                    "div",
                    { "class": "sep" },
                    ":"
                ),
                createElement(
                    "div",
                    { "class": "unit" },
                    createElement(
                        "div",
                        { "class": "value" },
                        seconds
                    ),
                    createElement(
                        "div",
                        null,
                        "SECONDS"
                    )
                )
            );

            return createElement(
                "div",
                useBlockProps.save(),
                countdown,
            );
        },
    });
})();
