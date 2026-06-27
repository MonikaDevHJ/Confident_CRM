import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(lead);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const lead = await prisma.lead.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(lead);
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.lead.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete lead",
      },
      {
        status: 500,
      }
    );
  }
}