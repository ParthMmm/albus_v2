import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);

  const { id, username, external_accounts, profile_image_url } = req.body.data;
  let img = "";

  if (external_accounts && external_accounts.length > 0) {
    const externalAccount = external_accounts[0];
    const externalImg = externalAccount.picture;

    if (
      profile_image_url === "https://www.gravatar.com/avatar?d=mp" &&
      externalImg
    ) {
      img = externalImg;
    }
  } else {
    img = profile_image_url;
  }

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      profileImage: img,
    },
  });

  if (user) {
    res.status(200).json({ message: "User created", user });
  }
}
