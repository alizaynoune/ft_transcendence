
export const loadSession = () => {
try {    
    const serialized = localStorage.getItem('session')
    if (!serialized) return undefined
    return JSON.parse(serialized)
} catch (error) {
    console.log(error, 'session Error');
    return undefined
}
}

export const saveSession = (data: any) => {
    try {
        const serialized = JSON.stringify(data)
        localStorage.setItem('session', serialized)
    } catch (error) {
        console.log(error, 'seve session Error');
        
    }
}

