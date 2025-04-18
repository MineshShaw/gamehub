import bcrypt from 'bcrypt';
import { supabase } from '@/lib/supabaseClient';

/**
 * Handles POST requests to /api/signup
 *
 * Registers a new user by storing their email and hashed password in the database.
 * If the user already exists, returns a 400 status code with an error message.
 * If the signup fails due to any other error, returns a 500 status code with an error message.
 * If the signup is successful, returns a 200 status code with a success message.
 * If the request method is not POST, returns a 405 status code.
 *
 * @param {object} req - The HTTP request object containing the user's email and password.
 * @param {object} res - The HTTP response object used to send back the appropriate response.
 */

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
