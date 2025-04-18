import { getUpdates } from '@/app/lib/updates'
import { Update } from '@/app/ui/update'
import NavBar from '../ui/NavBar'


export default async function Projects() {
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