const BASE = process.env.BOT_MAKER_API_URL


export async function getHomeRoute() {

    try {
        const res = await fetch(`${BASE}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
        return 'Connected';
    } catch (err) {
        console.log(err)
        return 'No Connection Found';
    }

}

