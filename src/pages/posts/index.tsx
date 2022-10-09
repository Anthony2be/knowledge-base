import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

export default function Component() {
  const { data } = trpc.post.getAll.useQuery()
  
  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-full gap-4 pt-4">
        <h1>Posts</h1>
        {data?.map(post => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl" key={post.id}>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.description}</p>
                <p>{post.id}</p>
                <div className="card-actions">
                  <Link href={`posts/${post.id}`}>
                    <button className="btn btn-link">Go to post</button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
