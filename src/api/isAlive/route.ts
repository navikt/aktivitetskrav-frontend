import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "Alive!" }, { status: 200 });
}