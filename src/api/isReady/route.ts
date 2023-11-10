import { NextResponse } from 'next/server'

export function GET(): NextResponse<{ message: string }> {
    return NextResponse.json({ message: 'I am ready' })
}