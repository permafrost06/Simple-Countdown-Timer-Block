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


document.querySelectorAll(".timer-container").forEach(timer => {
    setInterval(() => {
        const { days, hours, minutes, seconds } = getTimeDifference(
            new Date().toISOString(),
            timer.dataset.targetTime
        );

        const values = timer.querySelectorAll(".value");
        values[0].innerText = days;
        values[1].innerText = hours;
        values[2].innerText = minutes;
        values[3].innerText = seconds;
    }, 1000);
});
