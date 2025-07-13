
type UpdateProps = {
    update: {
      id: string
      title: string
      excerpt: string
    }
  }
  
  export function Update({ update }: UpdateProps) {
    return (
      <li key={update.id} className='mb-4'>
        <h2 className='text-xl font-bold'>{update.title}</h2>
        <p className='text-gray-600'>{update.excerpt}</p>
      </li>
    )
  }