import bcrypt from 'bcrypt';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (fetchError?.code !== 'PGRST116' && existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }]);

  if (insertError) {
    return res.status(500).json({ error: 'Signup failed' });
  }

  res.status(200).json({ message: 'Signup successful' });
}
