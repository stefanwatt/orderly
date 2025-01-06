import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
  const { session } = await safeGetSession()
  if (!session) return {}
  const res = await supabase
    .from('players')
    .select('*')
    .eq('id', session?.user?.id)
    .single()

  const { data } = res
  if (res.error) return error(500, res.error)
  return {
    player: data,
    session,
    cookies: cookies.getAll(),
  }
}
