export function convertToMinuteSecond(time) {
    let min = time.min;
    let sec = time.sec;
    let ms = time.ms;
    if (ms >= 100) {
        sec = Number.parseInt(ms / 100);
        ms -= sec * 100;
        sec += time.sec;
    }
    if (sec >= 60) {
        min = Number.parseInt(sec / 60);
        sec -= min * 60;
        min += time.min;
    }
    return { min, sec, ms };
}
