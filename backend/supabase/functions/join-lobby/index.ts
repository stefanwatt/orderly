import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { assert } from "jsr:@std/assert";
import { createClient } from "jsr:@supabase/supabase-js@2";

const URL = Deno.env.get("SUPABASE_URL") || "";
const KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

Deno.serve(async (req) => {
  const client = createClient(URL, KEY);
  const { id } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  assert(token, "couldnt get bearer token");
  const { data: { user } } = await client.auth.getUser(token);
  assert(user, "couldnt get user");
  const res = await client.from("games")
    .select(`
      id,
      admin:players!admin_id ( id, name ),
      players:participations!inner (
        player:players ( id, name )
      )
    `)
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
  const game = res.data;
  const already_in_lobby = game.players.find((item) => item.player.id == user.id);
  if (!already_in_lobby) {
    const participation = { player_id: user.id, game_id: game.id };
    const res = await client.from("participations").insert([participation])
      .select();
    if (res.error) {
      new Response(JSON.stringify(res.error), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(res.error)
    assert(res.data, "error creating participation");
  }
  console.log("everything ok");
  return new Response(
    JSON.stringify({ success: true, ...res.data }),
    { headers: { "Content-Type": "application/json" } },
  );
});
