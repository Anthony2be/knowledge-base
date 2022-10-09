import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

export default function Component() {
  const { data: session } = useSession()
  const [deleteText, setDeleteText] = React.useState('')
  const [deleted , setDeleted] = React.useState(false)

  const deletePost = trpc.post.delete.useMutation({
    onSuccess: (data) => {
      console.log('success')
      console.log(data)
      setDeleteText('')
      setDeleted(true)
    },
    onError: (data) => {
      console.log(data.message)
    },
  })

  if (!session) {
    return <p>Not signed in</p>
  }

  const handleDelete = () => {
    console.log(deleteText)
    deletePost.mutate({ id: deleteText })
  }

  if (deleted) {
    return <p>Post deleted</p>
  }
  return (
    <>
      <div className="w-fit">
        <input
          type="text"
          onChange={(e) => setDeleteText(e.target.value)}
          value={deleteText}
          className="text-black"
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  )
}
