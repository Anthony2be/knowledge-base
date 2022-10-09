import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Markdown from '../../components/markdown'
import Error from 'next/error'

export default function Component() {
  const router = useRouter()
  const id = router.query.id as string

  const { data: post, isLoading } = trpc.post.getOne.useQuery({ id: id as string })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!post) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <div className="prose mx-auto mt-4">
        <h1>{post?.title}</h1>
        <Markdown>{post?.content as string}</Markdown>
        <p>{post?.author.name}</p>
      </div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={post?.author.image as string} alt="author image" />
        </div>
      </div>
    </>
  )
}
