import {useTitle as reactUseTitle} from 'react-use';

const DEFAULT_TITLE = process.env.REACT_APP_TITLE;

export default function useTitle(title, options) {
    let t = title;
    if (DEFAULT_TITLE) {
        t += ' - ' + DEFAULT_TITLE;
    }

    reactUseTitle(t, options);
}
