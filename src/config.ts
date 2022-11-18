const STATUS_FORMATTED = "i am paulina & essay {}% done";

export const UPDATE_INTERVAL_S = 60;

export const ESSAY_TARGET = 2000;

export function formatMessage(percent: number) {
    return STATUS_FORMATTED.replace("{}", `${round5(percent)}`);
}

function round5(n: number) {
    const thou = 10_000;
    
    return Math.round(n * thou)/thou;
}