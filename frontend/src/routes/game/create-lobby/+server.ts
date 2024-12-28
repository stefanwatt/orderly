import { error, redirect} from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { assert } from '$lib/assert';

export const GET: RequestHandler = async ({ url,locals:{supabase} }) => {
    const {data,error} = await supabase.functions.invoke("create-lobby",{})
    assert(!error && data.id, 'error creating lobby');
    return new Response(data.id)
}
