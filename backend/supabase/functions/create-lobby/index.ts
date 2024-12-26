import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { assert } from "jsr:@std/assert";
import { createClient } from "jsr:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL") || "";
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async () => {
  const client = createClient(URL, KEY);
  const res = await client.from("games").insert([{}]).select();
  if (res.error) {
    new Response(JSON.stringify(res.error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  assert(res.data, "data cannot be null if !res.error");
  return new Response(
    JSON.stringify(res.data[0]),
    { headers: { "Content-Type": "application/json" } },
  );
});
