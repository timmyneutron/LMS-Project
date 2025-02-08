import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

const utapi = new UTApi();

const uploadThingRegex = /^https:\/\/utfs.io\/f\/(?<key>[a-zA-Z0-9]*)$/;

export async function DELETE(
  req: Request,
  { params } : { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      },
    });

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileKeys = course.chapters
      .filter(chapter => chapter.videoUrl)
      .map(chapter => uploadThingRegex.exec(chapter.videoUrl!)?.groups?.key)
      .filter(key => key !== undefined);

    if (course.imageUrl) {
      const imageKey = uploadThingRegex.exec(course.imageUrl)?.groups?.key;
      if (imageKey) fileKeys.push(imageKey);
    }

    if (fileKeys.length > 0) await utapi.deleteFiles(fileKeys);

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params } : { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}