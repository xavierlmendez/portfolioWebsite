import { getUpdates } from '@/app/lib/updates'
import { BlogEntry } from '@/app/ui/resourcesAndBlog/update'


export default async function BotBrain() {
    const updates = await getUpdates()
   
    return (
      <ul>
        <div>botMaker individual bot view</div>
        {updates.map((update) => (
          <BlogEntry key={update.id} update={update} />
        ))}
      </ul>
    )
  }