import { getLeadingZeroNumber } from './TextUtils';

const convertToMinuteSecondMs = (time) => {
    let hr = time.hr || 0;
    let min = time.min || 0;
    let sec = time.sec || 0;
    let ms = time.ms || 0;
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
};

const increaseByMs = (time) => {
    let { min, sec, ms } = time;
    ms += 14 + Number.parseInt(Math.random() * 2);
    if (ms >= 100) {
        sec++;
        ms = 0;
    }
    if (sec >= 60) {
        min++;
        sec = 0;
    }
    return { min, sec, ms };
};
const convertToMs = (time) => {
    const { min, sec, ms } = time;
    return min * 60 * 60 + sec * 1000 + ms * 10;
};
const convertToMinuteSecondMsText = (time) => {
    const temp = { min: '00', sec: '00', ms: '00' };
    if (time.min) {
        temp.min = getLeadingZeroNumber(time.min, 2);
    }
    if (time.sec) {
        temp.sec = getLeadingZeroNumber(time.sec, 2);
    }
    if (time.ms) {
        temp.ms = getLeadingZeroNumber(time.ms, 2);
    }
    const result = `${temp.min}:${temp.sec}:${temp.ms}`;
    return result;
};

const compareTime = (time1, time2, leftMost = false) => {
    let result = time1.min - time2.min;
    if (result === 0) {
        result = time1.sec - time2.sec;
    }
    if (result === 0) {
        result = time1.ms - time2.ms;
    }
    return leftMost ? -result : result;
};

export {
    convertToMinuteSecondMs,
    convertToMinuteSecondMsText,
    compareTime,
    increaseByMs,
    convertToMs,
};
