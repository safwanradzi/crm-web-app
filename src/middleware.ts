import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // 1. Let Supabase update session for all requests
    const res = await updateSession(request);

    const pathname = request.nextUrl.pathname;
    
    // 2. Paths to ignore for next-intl (dashboard, api, static files, auth)
    const ignorePaths = [
        '/dashboard',
        '/portal',
        '/login',
        '/auth',
        '/api',
        '/_next',
        '/favicon.ico'
    ];

    const isIgnored = ignorePaths.some(p => pathname.startsWith(p)) || pathname.match(/\.(.*)$/);

    if (isIgnored) {
        return res; // Return supabase response directly
    }

    // 3. Process with next-intl for public routes
    const intlResponse = intlMiddleware(request);
    
    // Crucially, we just need to pass the Set-Cookie headers from Supabase
    // to the intlResponse to preserve authentication session updates.
    res.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
            intlResponse.headers.append(key, value);
        }
    });

    return intlResponse;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
