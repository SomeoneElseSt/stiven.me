import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isURL from 'validator/lib/isURL';

interface Env {
    BRRR_USER_SECRET: string;
}

type HiField = 'name' | 'contact' | 'thoughts';

type HiPayload = Record<HiField, string>;

const BRRR_API_BASE_URL = 'https://api.brrr.now/v1';
const HI_FIELDS: readonly HiField[] = ['name', 'contact', 'thoughts'];
const MAX_FIELD_LENGTH = 500;
const CONTACT_VALIDATION_ERROR =
    'contact must be a link (http/https), email address, or phone number';

function isValidContact(contact: string): boolean {
    return isEmail(contact)
        || isURL(contact, { protocols: ['http', 'https'], require_protocol: true })
        || isMobilePhone(contact, 'any');
}

function jsonResponse(body: object, status: number): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

function readHiField(record: Record<string, unknown>, field: HiField): string | null {
    const value = record[field];
    if (typeof value !== 'string') {
        return null;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }
    if (trimmed.length > MAX_FIELD_LENGTH) {
        return null;
    }

    return trimmed;
}

function parseHiPayload(body: unknown): HiPayload | null {
    if (!body || typeof body !== 'object') {
        return null;
    }

    const record = body as Record<string, unknown>;
    const payload = {} as HiPayload;

    for (const field of HI_FIELDS) {
        const value = readHiField(record, field);
        if (!value) {
            return null;
        }
        payload[field] = value;
    }

    return payload;
}

async function readRequestJson(request: Request): Promise<unknown | null> {
    try {
        return await request.json();
    } catch {
        return null;
    }
}

async function sendBrrrNotification(userSecret: string, payload: HiPayload): Promise<boolean> {
    const response = await fetch(`${BRRR_API_BASE_URL}/${userSecret}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: `Curious mind: ${payload.name}`,
            message: `${payload.contact}\n\n${payload.thoughts}`,
            thread_id: 'stiven-me-curious',
        }),
    });

    return response.ok;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const userSecret = context.env.BRRR_USER_SECRET;
    if (!userSecret) {
        return jsonResponse({ error: 'Service unavailable' }, 503);
    }

    const body = await readRequestJson(context.request);
    if (body === null) {
        return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }

    const payload = parseHiPayload(body);
    if (!payload) {
        return jsonResponse({
            error: 'Expected JSON object with non-empty string fields: name, contact, thoughts',
        }, 400);
    }

    if (!isValidContact(payload.contact)) {
        return jsonResponse({ error: CONTACT_VALIDATION_ERROR }, 400);
    }

    const sent = await sendBrrrNotification(userSecret, payload);
    if (!sent) {
        return jsonResponse({ error: 'Failed to send notification' }, 502);
    }

    return jsonResponse({ ok: true }, 200);
};

export const onRequest: PagesFunction<Env> = async () => {
    return jsonResponse({ error: 'Method not allowed' }, 405);
};
