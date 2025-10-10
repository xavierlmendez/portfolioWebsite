import { getHomeRoute } from '@/app/lib/projectUtils/botMaker/botMakerConnect'
import { getUpdates } from '@/app/lib/updates'
import { BlogEntry } from '@/app/ui/update'


export default async function BotBrain() {
    const [updates, beStatus] = await Promise.all([getUpdates(), getHomeRoute()]);

   
    return (
      <ul>
         <div>botMaker Overview</div>
         <h2 className="text-lg">
        BE Status: <span className="font-mono">{beStatus}</span>
      </h2>
        {updates.map((update) => (
          <BlogEntry key={update.id} update={update} />
        ))}
      </ul>
    )
  }