import dayjs from 'dayjs';

/**
 * 将给定时间戳转换为 yyyy-mm-dd 格式字符串
 *
 * @param timestamp
 */
export function format(timestamp) {
    if (!timestamp) return '';

    return dayjs(timestamp).format('YYYY-MM-DD');
}

export function formatLong(timestamp) {
    if (!timestamp) return '';

    return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
}

/**
 * 将给定时间戳转换为更适合阅读的字符串.
 *
 * @param timestamp 时间戳
 * @param long 如果需要显示日期，默认只显示日期，true 的时候显示带时间的日期
 */
export function humanize(timestamp, long = false) {
    if (!timestamp) return '';

    const now = Date.now();

    // 如果给定时间比当前时间还大,说明有问题
    if (now < timestamp) {
        return '';
    }

    const diff = now - timestamp;
    if (diff <= 1000) {
        return '刚刚';
    } else if (diff <= 60 * 1000) {
        return Math.round(diff / 1000) + '秒前';
    } else if (diff <= 60 * 60 * 1000) {
        return Math.round(diff / (60 * 1000)) + '分钟前';
    } else if (diff <= 24 * 60 * 60 * 1000) {
        return Math.round(diff / (60 * 60 * 1000)) + '小时前';
    } else if (diff <= 48 * 60 * 60 * 1000) {
        return '昨天';
    }

    return long ? formatLong(timestamp) : format(timestamp);
}

export function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export function getTimeText(time, defaultText) {
    if (!time) return defaultText;
    if (typeof time === 'number') return formatLong(time);
    if (isValidDate(time)) return formatLong(time.getTime());
    return defaultText;
}

export function getDate(time, defaultDate = new Date()) {
    if (!time) return defaultDate;
    if (typeof time === 'number') return new Date(time);
    if (isValidDate(time)) return time;
    return defaultDate;
}
