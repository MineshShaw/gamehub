import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabaseClient';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

/**
 * Handles POST requests to /api/login
 *
 * Authenticates a user by verifying email and password.
 * Returns a JSON response with a JWT token if the authentication is successful.
 * If the authentication fails, returns a 400 status code with an error message.
 * If the request method is not POST, returns a 405 status code.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user || error) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({ token });
}
