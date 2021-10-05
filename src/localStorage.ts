export function restoreState<T>(key: string, defaultState: T) {
    let limits = defaultState
    const limitsAsString = localStorage.getItem(key)
    if (limitsAsString) limits = JSON.parse(limitsAsString) as T
    return limits
}

export function saveState<T> (key: string, state: T) {
    localStorage.setItem(key, JSON.stringify(state))
}