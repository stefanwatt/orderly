import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { assert } from "jsr:@std/assert";
import { createClient } from "jsr:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL") || "";
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  const client = createClient(URL, KEY);
  console.log(req.headers)
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  assert(token, "couldnt get bearer token");
  const { data: { user } } = await client.auth.getUser(token);
  assert(user && user?.id, "couldnt get user");
  let res = await client.from("games").insert([{
    admin_id: user?.id,
  }]).select();
  if (res.error) {
    return new Response(JSON.stringify(res.error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  assert(res.data, "error creating game");
  const game = res.data[0];
  assert(game && game?.id, "couldnt get game");
  const participation = { player_id: user?.id, game_id: game?.id };
  console.log("creating participation: ", participation);
  res = await client.from("participations").insert([participation]).select();
  if (res.error) {
    new Response(JSON.stringify(res.error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  assert(res.data, "error creating participation");
  return new Response(
    JSON.stringify(game),
    { headers: { "Content-Type": "application/json" } },
  );
});
