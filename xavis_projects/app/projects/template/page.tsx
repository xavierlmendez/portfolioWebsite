import { getUpdates } from '@/app/lib/updates'
import { BlogEntry } from '@/app/ui/update'


export default async function BotBrain() {
    const updates = await getUpdates()
   
    return (
      <ul>
        <div>botBrain Overview</div>
        {updates.map((update) => (
          <BlogEntry key={update.id} update={update} />
        ))}
      </ul>
    )
  }