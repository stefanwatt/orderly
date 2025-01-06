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

  // const res = await fetch("http://localhost:5173/api/functions/v1/join-lobby", {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + session.data.session?.access_token
  //   },
  //   body: JSON.stringify({ id })
  // })

  const res = await supabase.functions.invoke("join-lobby", { body: { id } })
  const { data } = res
  if (res.error) return error(500, res.error)
  assert(data && data.success && data.id, "malformed json response")
  return data;
};
