import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to save a game session
export async function saveGameSession({
  playerName,
  isVictory,
  turnsSurvived,
  finalPeople,
  finalClass,
  finalIdea,
  finalIntl,
  failedStat
}) {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert([
        {
          player_name: playerName,
          is_victory: isVictory,
          turns_survived: turnsSurvived,
          final_people: finalPeople,
          final_class: finalClass,
          final_idea: finalIdea,
          final_intl: finalIntl,
          failed_stat: failedStat
        }
      ])
      .select()

    if (error) throw error
    
    console.log('Game session saved:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error saving game session:', error)
    return { success: false, error }
  }
}
