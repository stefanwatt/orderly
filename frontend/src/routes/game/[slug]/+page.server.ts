import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { assert } from "$lib/assert"

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const session = await supabase.auth.getSession()
  if (session.error || !session.data.session?.user?.id) {
    const signup = await supabase.auth.signInAnonymously()
    assert(!signup.error, "error signing in anonymously")
  }
  const id = params.slug
  const res = await fetch("http://localhost:5173/api/functions/v1/join-lobby", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
  console.log(res)
  if (!res.ok) return error(404, 'Not found')
  const json = await res.json()
  assert(json && json.success && json.id, "malformed json response")
  return json;
};
