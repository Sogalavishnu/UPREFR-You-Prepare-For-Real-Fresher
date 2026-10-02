import { supabase } from '../supabase'

// progress: one row per user and level, e.g. key "cn-0" with score in percent
export async function getProgress(uid) {
  const { data, error } = await supabase.from('progress').select('key,score').eq('user_id', uid)
  if (error) throw error
  return Object.fromEntries(data.map((r) => [r.key, r.score]))
}

export async function saveScore(uid, key, score) {
  const current = await getProgress(uid)
  if ((current[key] ?? -1) >= score) return // keep the best score only
  const { error } = await supabase.from('progress').upsert({ user_id: uid, key, score })
  if (error) throw error
}

export async function addQuery(user, subject, message) {
  const { error } = await supabase
    .from('queries')
    .insert({ user_id: user.uid, email: user.email, name: user.displayName || '', subject, message })
  if (error) throw error
}

export async function getMyQueries(uid) {
  const { data, error } = await supabase
    .from('queries')
    .select('*')
    .eq('user_id', uid)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
