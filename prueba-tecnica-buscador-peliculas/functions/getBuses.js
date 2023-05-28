import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_API_KEY = process.env.SUPABASE_SERVICE_API_KEY;

const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

export async function handler(event, context) {
    try {
        const { data, error } = await supabase.from('buses').select('*');

        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to fetch buses' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ buses: data }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
}
