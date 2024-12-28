import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { assert } from "jsr:@std/assert";
import { createClient } from "jsr:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL") || "";
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  const { id } = await req.json();
  const client = createClient(URL, KEY);
  const res = await client.from("games")
    .select()
    .eq("id", id)
    .single();
  if (res.error) {
    console.log("error:, ", res.error);
    return new Response(JSON.stringify(res.error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!res.data) {
    console.log("couldnt find this game");
    return new Response(
      JSON.stringify({ success: false }),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  assert(res.data, "data cannot be null if !res.erraqqqqb;or");
  console.log("everything ok");
  return new Response(
    JSON.stringify({ success: true, id: res.data.id }),
    { headers: { "Content-Type": "application/json" } },
  );
});
