const STATUS_FORMATTED = "i am paulina & essay due tomorrow. {}% done if i don't reply this is why im sorry";

export const UPDATE_INTERVAL_S = 60;

export const ESSAY_TARGET = 1500;

export function formatMessage(percent: number) {
    return STATUS_FORMATTED.replace("{}", `${round5(percent)}`);
}

function round5(n: number) {
    const thou = 10_000;
    
    return Math.round(n * thou)/thou;
}