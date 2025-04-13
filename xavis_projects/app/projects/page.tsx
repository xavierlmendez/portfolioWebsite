import { getUpdates } from '@/app/lib/updates'
import { Update } from '@/app/ui/update'


export default async function BotBrain() {
    const updates = await getUpdates()
   
    return (
      <ul>
        <div>bot Maker Home</div>
        {updates.map((update) => (
          <Update key={update.id} update={update} />
        ))}
      </ul>
    )
  }