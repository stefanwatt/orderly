import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { assert } from "$lib/assert"

export const load: PageLoad = async ({ params }) => {
  const id = params.slug
  const res = await fetch("http://localhost:5173/api/functions/v1/verify-lobby", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
  if (!res.ok) return error(404, 'Not found')
  const json = await res.json()
  assert(json && json.success && json.id, "malformed json response")
  return {
    id: json.id
  };
};
