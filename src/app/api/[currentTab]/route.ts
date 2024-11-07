import connectToDb from "@/database";
import { NextResponse } from "next/server";
import Home from "@/models/home";
import About from "@/models/about";
import Education from "@/models/education";
import Experience from "@/models/experience";
import Project from "@/models/projects";
import { ObjectId } from "mongodb"; 

export const dynamic = "force-dynamic";

const modelMap = {
  home: Home,
  about: About,
  projects: Project,
  experience: Experience,
  education: Education,
};

export async function POST(
  req: Request,
  { params }: { params: { currentTab: string } }
) {
  const { currentTab } = params;
  const Model = modelMap[currentTab as keyof typeof modelMap];

  if (!Model) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid model type",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDb();
    const extractData = await req.json();

    const saveData = await Model.create(extractData);

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { currentTab: string } }
) {
  const { currentTab } = params;
  const Model = modelMap[currentTab as keyof typeof modelMap];

  if (!Model) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid model type",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDb();
    const getData = await Model.find({});

    if (getData) {
      return NextResponse.json({
        success: true,
        message: "Data fetched successfully.",
        data: getData,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { currentTab: string } }
) {
  const { currentTab } = params;
  const Model = modelMap[currentTab as keyof typeof modelMap];

  if (!Model) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid model type",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDb();
    const extractData = await req.json();

    const { sectionId, ...restData} = extractData

    const updateData = await Model.findOneAndUpdate(
      { _id: new ObjectId(sectionId) },
      { $set: restData },
      { new: true }
    );
    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "Data updated successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { currentTab: string } }
) {
  const { currentTab } = params;
  const Model = modelMap[currentTab as keyof typeof modelMap];

  if (!Model) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid model type",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDb();
    const { id } = await req.json();

    const deleteData = await Model.findByIdAndDelete(id);

    if (deleteData) {
      return NextResponse.json({
        success: true,
        message: "Data deleted successfully.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Data not found.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}