import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Markdown from '../../components/markdown'

export default function Component() {
  const router = useRouter()
  const { id } = router.query

  const { data: post } = trpc.post.getOne.useQuery({ id: id as string })

  return (
    <>
      <h1>{post?.title}</h1>
      <Markdown>{post?.content as string}</Markdown>
      <p>{post?.author.name}</p>
      <img src={post?.author.image as string} alt="author image" />
    </>
  )
}
