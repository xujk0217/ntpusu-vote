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

    if (studentId != process.env.ADMIN) {
        throw createError({
            statusCode: 401,
            statusMessage: '不在管理員名單中'
        })
    }

    const { id: id } = getQuery(event) as { id: string }

    await prisma.admin.delete({ where: { id: parseInt(id) } })

    return {}
})