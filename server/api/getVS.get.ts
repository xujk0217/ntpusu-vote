import prisma from '~/lib/prisma'
import { getServerSession } from '#auth'
export default defineEventHandler(async (event) => {
    const session = await getServerSession(event) as { user: { email: string } } | null

    if (!session) {
        throw createError({
            statusCode: 401,
            statusMessage: '未登入'
        })
    }

    const email = session['user']['email']
    const studentId = email.substring(1, 10)

    const admin = await prisma.admin.findUnique({
        where: { id: parseInt(studentId) },
    })

    if (!admin) {
        throw createError({
            statusCode: 401,
            statusMessage: '不在管理員名單中'
        })
    }

    return await prisma.voteSession.findMany({
        include: {
            group: true,
        }
    })
})