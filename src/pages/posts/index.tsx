import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import React from 'react'

export default function Component() {
  const { data: session } = useSession()
  const [content, setContent] = React.useState('')
  const [deleteText, setDeleteText] = React.useState('')
  const { data, refetch } = trpc.post.getAll.useQuery()
  const newPost = trpc.post.create.useMutation({
    onSuccess: (data) => {
      console.log('success')
      console.log(data)
      setContent('')
      refetch()
    },
    onError: (data) => {
      console.log(data.message)
    },
  })

  const deletePost = trpc.post.delete.useMutation({
    onSuccess: (data) => {
      console.log('success')
      console.log(data)
      setDeleteText('')
      refetch()
    },
    onError: (data) => {
      console.log(data.message)
    },
  })

  if (!session) {
    return <p>Not signed in</p>
  }

  const handleClick = () => {
    newPost.mutate({ title: 'test', content: content, published: true })
  }

  const handleDelete = () => {
    console.log(deleteText)
    deletePost.mutate({ id: deleteText })
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-slate-700 text-white w-full gap-4 pt-4">
        <h1>Posts</h1>
        {data?.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.id}</p>
              <p>{post.title}</p>
              <p>{post.content}</p>
              <p>{post.published}</p>
            </div>
          )
        })}
        <textarea
          cols={30}
          rows={10}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="text-black"
        />
        <button onClick={handleClick}>Create post</button>
        <div className="w-fit">
          <input
            type="text"
            onChange={(e) => setDeleteText(e.target.value)}
            value={deleteText}
            className="text-black"
          />
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
  )
}
