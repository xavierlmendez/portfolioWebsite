const BASE = process.env.BOT_MAKER_API_URL


export async function getHomeRoute() {

    try {
        const res = await fetch(`${BASE}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
        if (res.ok) {
            return 'Connected';
        } else {
            return 'Connection Unhealthy'
        }
    } catch (err) {
        console.log(err)
        return 'No Connection Found';
    }
}

export async function getAlertPoll() {

    try {
        const res = await fetch(`${BASE}/alertPoll`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
        if (res.ok) {
            return 'Connected';
        } else {
            return 'Connection Unhealthy'
        }
    } catch (err) {
        console.log(err)
        return 'No Connection Found';
    }
}
