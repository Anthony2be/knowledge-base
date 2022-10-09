import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import React, { FormEvent } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { CreatePostInput } from '../../schema/post.schema'
import TextareaAutosize from 'react-textarea-autosize';

export default function Component() {
  const { data: session } = useSession()
  const { handleSubmit, register } = useForm<CreatePostInput>()

  const newPost = trpc.post.create.useMutation({
    onSuccess: (data) => {
      router.push(`/posts/${data.id}`)
    },
    onError: (data) => {
      console.log(data.message)
    },
  })

  if (!session) {
    return <p>Not signed in</p>
  }

  const onSubmit = (values: CreatePostInput) => {
    newPost.mutate(values)
  }


  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-4 pt-4">
      {newPost.error && <p>{newPost.error.message}</p>}

      <h1 className="text-2xl">Create post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 pt-4">
        <input type="text" placeholder="title" {...register('title')} required className="input input-bordered w-full max-w-xs text-xl"/>
        <br />
        <TextareaAutosize
          cols={30}
          rows={10}
          className="input input-bordered w-full max-w-xs input-lg"
          placeholder="Content"
          required
          {...register('content')}
        />
        <br />
        <TextareaAutosize
          cols={30}
          rows={10}
          className="input input-bordered w-full max-w-xs input-lg"
          placeholder="Description"
          required
          {...register('description')}
        />
        <br />
        <button type="submit">Create post</button>
      </form>
    </div>
  )
}
