import dayjs from "dayjs";

function changeDateStyle(timeStyle: string) {
    return dayjs(new Date().toISOString()).format(timeStyle);
}

export default changeDateStyle